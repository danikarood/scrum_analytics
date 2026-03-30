import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2'; 
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import '../App.css';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Timeline() {
  const [availableTeams, setAvailableTeams] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_KEY = "dc88cdd9263fa29e592b9e6ed1901ba9"; // Same as Home

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await axios.get('https://v1.rugby.api-sports.io/teams?league=76&season=2024', {
          headers: { 'x-apisports-key': API_KEY }
        });
        setAvailableTeams(res.data.response || []);
      } catch (err) {
        console.error("Timeline Team Load Error:", err);
      }
    };
    fetchTeams();
  }, []);

  const handleAddTeam = (teamName) => {
    if (!teamName) return;
    if (selectedTeams.length < 5 && !selectedTeams.includes(teamName)) {
      setSelectedTeams([...selectedTeams, teamName]);
    }
  };

  const handleRemoveTeam = (teamName) => {
    setSelectedTeams(selectedTeams.filter(t => t !== teamName));
  };

  // Example data structure for the chart (Dummy data for tomorrow's demo)
  const data = {
    labels: ['Round 1', 'Round 2', 'Round 3', 'Round 4', 'Round 5'],
    datasets: selectedTeams.map((team, index) => ({
      label: team,
      data: [10 + index, 25 - index, 15 + index, 30, 20 + index * 2],
      borderColor: index === 0 ? '#FF6500' : `rgba(255, 255, 255, ${0.8 - index * 0.15})`,
      backgroundColor: '#FF6500',
      tension: 0.4,
    })),
  };

  return (
    <div className="landing-container" style={{ 
      background: 'radial-gradient(circle at 50% 50%, #1a2a44 0%, #0B192C 100%)', // Spacing and color feed
      minHeight: '100vh', padding: '60px 20px' 
    }}>
      <h1 className="text-center" style={{ color: 'white', fontWeight: '900', marginBottom: '40px' }}>
        SEASON <span style={{ color: '#FF6500' }}>PROGRESSION</span>
      </h1>

      {/* TEAM SELECTOR SECTION */}
      <div className="glass-banner" style={{ 
        background: 'rgba(255, 255, 255, 0.01)', border: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '30px', borderRadius: '25px', marginBottom: '40px', maxWidth: '900px', margin: '0 auto 40px auto'
      }}>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
          <label style={{ color: 'white', fontWeight: 'bold' }}>COMPARE FORM (MAX 5):</label>
          <select 
            onChange={(e) => handleAddTeam(e.target.value)}
            className="form-select"
            style={{ background: '#0B192C', color: 'white', border: '1px solid #FF6500', borderRadius: '10px', padding: '8px', flexGrow: 1 }}
          >
            <option value="">+ Add a Team</option>
            {availableTeams.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
          </select>
        </div>

        {/* TEAM CHIPS (REMOVE LOGIC) */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
          {selectedTeams.map(team => (
            <div key={team} style={{ 
              background: 'rgba(255, 101, 0, 0.2)', color: 'white', padding: '8px 15px', 
              borderRadius: '12px', border: '1px solid #FF6500', display: 'flex', alignItems: 'center', gap: '10px' 
            }}>
              {team}
              <span 
                onClick={() => handleRemoveTeam(team)} 
                style={{ cursor: 'pointer', color: '#FF6500', fontWeight: '900', fontSize: '1.2rem' }}
              >×</span>
            </div>
          ))}
        </div>
      </div>

      {/* CHART DISPLAY AREA */}
      <div className="glass-card" style={{ 
        background: 'rgba(255, 255, 255, 0.005)', border: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '40px', borderRadius: '35px', maxWidth: '1000px', margin: '0 auto', backdropFilter: 'blur(5px)'
      }}>
        {selectedTeams.length > 0 ? (
          <Line data={data} options={{ responsive: true, scales: { y: { ticks: { color: 'white' } }, x: { ticks: { color: 'white' } } } }} />
        ) : (
          <div style={{ textAlign: 'center', padding: '50px', color: 'rgba(255,255,255,0.3)' }}>
            <h3>NO TEAMS SELECTED</h3>
            <p>Select up to 5 teams above to visualize their season progression.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Timeline;