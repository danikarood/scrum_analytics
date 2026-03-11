import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../App.css';

function Home() {
  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null);

  useEffect(() => {
    // Why am I writing this function for the 10th time today?
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetching teams. If this fails, I'm literally going to toss my laptop out the window.
        const teamsRes = await axios.get('https://v1.rugby.api-sports.io/teams?country=South-Africa', {
          headers: { 'x-apisports-key': 'dc88cdd9263fa29e592b9e6ed1901ba9' }
        });
        
        // Hardcoded filter because the API loves to send me random nonsense.
        const targetList = ["Bulls", "Stormers", "Sharks", "Lions", "Cheetahs", "Pumas", "Griffons", "Griquas", "Western Province", "Boland"];
        const filtered = teamsRes.data.response.filter(t => 
            targetList.some(name => t.name.includes(name))
        );
        setTeams(filtered);

        // Fetching games. Added '/games' because the previous URL was basically a brick wall.
        const gamesRes = await axios.get('https://v1.rugby.api-sports.io/games?league=123&season=2025', {
          headers: { 'x-apisports-key': 'dc88cdd9263fa29e592b9e6ed1901ba9' }
        });
        setGames(gamesRes.data.response.slice(0, 3));
        
      } catch (err) { 
        // Everything is breaking. I don't even care anymore.
        console.error("Everything is broken:", err); 
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();

    // Auto-scroll logic. This code is held together by hope and duct tape.
    const interval = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        if (carouselRef.current.scrollLeft >= carouselRef.current.scrollWidth - carouselRef.current.clientWidth) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        }
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Renamed to 'handleCarouselScroll' just to satisfy ESLint's obsession with restricted globals.
  const handleCarouselScroll = (direction) => {
    if (carouselRef.current) {
      const amount = 300;
      carouselRef.current.scrollBy({ 
        left: direction === 'left' ? -amount : amount, 
        behavior: 'smooth' 
      });
    }
  };

  // If this stays on "Still loading" forever, I'm just going to go to sleep.
  if (loading) return <div className="loading">Still loading... please don't crash.</div>;

  return (
    <div className="landing-container">
      {/* Banner - Finally displays something other than a blank orange box */}
      <div className="upcoming-banner">
        <h2>NEXT MATCHES</h2>
        <div className="games-grid">
          {games.length > 0 ? games.map(g => (
            <div key={g.id} className="game-card">
              <p>{new Date(g.date).toDateString()}</p>
              <strong>{g.teams.home.name} vs {g.teams.away.name}</strong>
            </div>
          )) : <p>No scheduled matches found. Figures.</p>}
        </div>
      </div>

      <h2>SA DERBY TRACKER</h2>
      
      {/* Carousel - If these buttons don't work, I give up on UI design forever */}
      <div className="carousel-wrapper">
        <button className="nav-btn left" onClick={() => handleCarouselScroll('left')}>❮</button>
        <div className="carousel-container" ref={carouselRef}>
          {teams.length > 0 ? teams.map(team => (
            <div key={team.id} className="team-card">
              <img src={team.logo} alt={team.name} className="team-logo-img" />
              <h3>{team.name}</h3>
              <button className="cta-button">VIEW STATS</button>
            </div>
          )) : <p>No teams loaded. Great.</p>}
        </div>
        <button className="nav-btn right" onClick={() => handleCarouselScroll('right')}>❯</button>
      </div>
    </div>
  );
}
export default Home;