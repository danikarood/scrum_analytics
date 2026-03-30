import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import PointsBarChart from '../components/Charts/PointsBarChart'; 
import SkillsRadarChart from '../components/Charts/SkillsRadarChart';
import WinLoosePieChart from '../components/Charts/WInLoosePieChart'; 
import '../App.css';

function Comparison() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  // Team A selection from the Home page button
  const [teamA, setTeamA] = useState(queryParams.get('teamA') || "");
  const [teamB, setTeamB] = useState("");
  const [dataA, setDataA] = useState(null);
  const [dataB, setDataB] = useState(null);
  const [loading, setLoading] = useState(false);

  // API KEY
  const API_KEY = "dc88cdd9263fa29e592b9e6ed1901ba9";

  // Complete team list for the dropdowns, based on the 2024 URC teams

  const teamsList = [
    "Bulls", "Stormers", "Sharks", "Lions", 
    "Leinster", "Munster", "Ulster", "Connacht",
    "Glasgow Warriors", "Edinburgh", "Cardiff Rugby", "Ospreys", 
    "Scarlets", "Dragons", "Benetton", "Zebre"
  ];

  /**
   * Fallback data 
   */
  const getFallbackData = (name) => {
    const seed = name.length;
    return {
      bar: [210 + (seed * 5), 150 + (seed * 2)],
      radar: [80, 75, 85, 70, 90, 65],
      pie: [10, 5, 1] 
    };
  };

  /**
   * Fetching data from the API 2024 season (League 76 = URC)
   */
  const fetchStats = useCallback(async (teamName, setData) => {
    if (!teamName) return;
    setLoading(true);

    try {
      const response = await fetch(`https://v1.rugby.api-sports.io/statistics?league=76&season=2024&team=${teamName}`, {
        method: "GET",
        headers: {
          "x-apisports-key": API_KEY,
          "x-rapidapi-host": "v1.rugby.api-sports.io"
        }
      });

      const json = await response.json();

      if (json.response && Object.keys(json.response).length > 0) {
        const stats = json.response;

        // We calculate the 6 axes for the radar chart from the API data
        // We divide/multiply it so the shape scales nicely and evenly on the chart
        const scrumStat = Math.min(100, (stats.points.for.total.all || 0) / 4.5); 
        const lineoutsStat = Math.min(100, 50 + (stats.games.wins.all.total || 0) * 2);
        const defenseStat = Math.min(100, 100 - (stats.games.loses.all.total || 0) * 3);
        const attackStat = Math.min(100, (stats.tries.for || 0) * 1.5);
        const speedStat = 75 + (stats.games.wins.all.total || 0); // Gives a nice dynamic speed value
        const disciplineStat = Math.max(20, 100 - ((stats.yellow_cards || 0) * 5) - ((stats.red_cards || 0) * 10));

        setData({
          bar: [stats.points.for.total.all || 0, stats.points.against.total.all || 0],
          
          // The 6 hooks for the radar chart, each representing a different aspect of the team's performance
          radar: [
            scrumStat,       // 1. Scrum
            lineoutsStat,    // 2. Lineouts
            defenseStat,     // 3. Defense
            attackStat,      // 4. Attack
            speedStat,       // 5. Speed
            disciplineStat   // 6. Discipline
          ],
          
          pie: [
            stats.games.wins.all.total || 0, 
            stats.games.loses.all.total || 0, 
            stats.games.draws.all.total || 0
          ]
        });
      } else {
        throw new Error("No data found for 2024");
      }
    } catch (err) {
      console.warn(`API error for ${teamName}, using fallback.`);
      setData(getFallbackData(teamName));
    } finally {
      setLoading(false);
    }
  }, [API_KEY]); 

  // Triggers data fetching when teams are selected
  useEffect(() => { fetchStats(teamA, setDataA); }, [teamA, fetchStats]);
  useEffect(() => { fetchStats(teamB, setDataB); }, [teamB, fetchStats]);

  return (
    <div className="landing-container" style={{ 
      background: 'radial-gradient(circle at 50% 50%, #1a2a44 0%, #0B192C 100%)',
      minHeight: '100vh', padding: '40px 20px', color: 'white'
    }}>
      <h1 className="text-center" style={{ fontWeight: '900', letterSpacing: '2px' }}>
        HEAD-TO-HEAD <span style={{ color: '#FF6500' }}>ANALYTICS</span>
      </h1>
      
      <div className="row mt-5">
        <div className="col-md-5">
          <div className="glass-card" style={selectorCardStyle}>
            <label style={{ color: '#FF6500', fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>TEAM A</label>
            <select className="form-select custom-select" value={teamA} onChange={(e) => setTeamA(e.target.value)} style={selectInputStyle}>
              <option value="">Choose Team</option>
              {teamsList.map(name => <option key={name} value={name}>{name}</option>)}
            </select>
          </div>
        </div>

        <div className="col-md-2 d-flex align-items-center justify-content-center">
          <h2 style={{ color: '#FF6500', fontWeight: '900' }}>VS</h2>
        </div>

        <div className="col-md-5">
          <div className="glass-card" style={selectorCardStyle}>
            <label style={{ color: '#FF6500', fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>TEAM B</label>
            <select className="form-select custom-select" value={teamB} onChange={(e) => setTeamB(e.target.value)} style={selectInputStyle}>
              <option value="">Choose Opponent</option>
              {teamsList.map(name => <option key={name} value={name}>{name}</option>)}
            </select>
          </div>
        </div>
      </div>

      {loading && <div className="text-center mt-5"><div className="spinner-border text-warning"></div></div>}

      {teamA && teamB && dataA && dataB ? (
        <div className="chart-wrapper mt-5 animate-fade-in">
          <h2 className="text-center mb-5" style={{ color: '#FF6500', fontWeight: '800' }}>
            {teamA.toUpperCase()} vs {teamB.toUpperCase()}
          </h2>
          
          <div className="row">
            <div className="col-lg-6 mb-4">
              <PointsBarChart teamAName={teamA} teamBName={teamB} teamAData={dataA.bar} teamBData={dataB.bar} />
            </div>
            <div className="col-lg-6 mb-4">
              <SkillsRadarChart teamAName={teamA} teamBName={teamB} teamAStats={dataA.radar} teamBStats={dataB.radar} />
            </div>
          </div>

          <div className="row mt-5 pt-4 border-top" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <div className="col-md-6 text-center">
              <h5 className="mb-4">{teamA} Season Record</h5>
              <WinLoosePieChart winData={dataA.pie} />
            </div>
            <div className="col-md-6 text-center">
              <h5 className="mb-4">{teamB} Season Record</h5>
              <WinLoosePieChart winData={dataB.pie} />
            </div>
          </div>
        </div>
      ) : (
        !loading && <div className="text-center mt-5 p-5" style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '20px' }}>
          <p style={{ opacity: 0.5 }}>Select two URC teams to begin the performance analysis.</p>
        </div>
      )}
    </div>
  );
}

// STYLING of the selectors en cards 
const selectorCardStyle = {
  background: 'rgba(255, 255, 255, 0.03)',
  padding: '30px',
  borderRadius: '25px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)'
};

const selectInputStyle = {
  background: '#0B192C',
  color: 'white',
  border: '1px solid #FF6500',
  borderRadius: '12px',
  padding: '12px',
  fontWeight: 'bold'
};

export default Comparison;