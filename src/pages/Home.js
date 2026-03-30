import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../App.css';
import TeamCard from '../components/TeamCard';// pulling in the new components so that all the cards could have logos.

function Home() {
  const [teams, setTeams] = useState([]);
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);

  const API_KEY = "dc88cdd9263fa29e592b9e6ed1901ba9";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [sRes, tRes] = await Promise.all([
          axios.get('https://v1.rugby.api-sports.io/standings?league=76&season=2024', { headers: { 'x-apisports-key': API_KEY } }),
          axios.get('https://v1.rugby.api-sports.io/teams?league=76&season=2024', { headers: { 'x-apisports-key': API_KEY } })
        ]);

        if (sRes.data.response?.[0]) setStandings(sRes.data.response[0].slice(0, 3));
        if (tRes.data.response) setTeams(tRes.data.response);
      } catch (err) {
        console.error("Error while fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isPaused || loading || teams.length === 0) return;
    const interval = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollLeft += 1.2; 
        if (carouselRef.current.scrollLeft >= (carouselRef.current.scrollWidth - carouselRef.current.clientWidth)) {
          carouselRef.current.scrollLeft = 0;
        }
      }
    }, 20);
    return () => clearInterval(interval);
  }, [isPaused, loading, teams]);

  if (loading) return <div className="loading-screen">URC DATA SYNC...</div>;

  return (
    <div className="landing-container" style={{ 
      background: 'radial-gradient(circle at 50% 50%, #1a2a44 0%, #0B192C 100%)', 
      minHeight: '100vh', 
      padding: '40px 20px' 
    }}>
      
      {/* 2024 TOP PERFORMERS BANNER */}
      <div className="glass-banner" style={{ 
        background: 'rgba(255, 101, 0, 0.08)', 
        border: '1px solid rgba(255, 101, 0, 0.3)', 
        padding: '30px', 
        borderRadius: '25px', 
        marginBottom: '60px', 
        textAlign: 'center',
        backdropFilter: 'blur(10px)'
      }}>
        <h2 style={{ color: '#FF6500', fontWeight: '900', letterSpacing: '2px', marginBottom: '25px' }}>2024 TOP PERFORMERS</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
          {standings.map((pos, i) => (
            <div key={i} style={{ 
              display: 'flex', alignItems: 'center', gap: '15px', 
              background: 'rgba(255, 255, 255, 0.05)', padding: '10px 25px', 
              borderRadius: '50px', border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <span style={{ color: '#FF6500', fontWeight: '900' }}>#{i+1}</span>
              <img src={pos.team.logo} alt="" style={{ height: '35px', objectFit: 'contain' }} />
              <span style={{ color: 'white', fontWeight: 'bold' }}>{pos.team.name}: {pos.points} PTS</span>
            </div>
          ))}
        </div>
      </div>

      <h2 style={{ color: 'white', marginBottom: '30px', fontWeight: '800' }}>EXPLORE CONTENDERS</h2>
      
      {/* CAROUSEL */}
      <div 
        ref={carouselRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{ 
          display: 'flex', overflowX: 'auto', gap: '25px', 
          paddingBottom: '30px', scrollbarWidth: 'none', paddingLeft: '10px'
        }}
      >
        {teams.map(team => (
          <TeamCard key={team?.id || team?.team?.id} team={team} />
        ))}
      </div>
    </div>
  );
}

export default Home;