import React from 'react';
import { useNavigate } from 'react-router-dom';

// 1. ONS TREK DIE LOGO'S IN PRESIES SOOS HULLE IN JOU VS CODE VOUER IS
import cardiffLogo from '../assets/logos/Cardiff_Rugby_logo_(2021).jpg';
import connachtLogo from '../assets/logos/Connacht eagles logo.png';
import dragonsLogo from '../assets/logos/Dragons_RFC_logo.png';
import benettonLogo from '../assets/logos/LOGO-BENETTON-RUGBY-POS.jpeg';
import ospreysLogo from '../assets/logos/Osprey logo.png';
import scarletsLogo from '../assets/logos/Scarlets rugby logo.png';
import zebreLogo from '../assets/logos/Zebre prama logo.png';

// Fallback rugbybal as iets heeltemal breek
const genericRugby = "https://media.istockphoto.com/id/1141708453/vector/rugby-ball-icon-vector-graphic.jpg?s=612x612&w=0&k=20&c=K5bU_xH6V5x5M-A8b_F3J5k7mP1vP5Qf4eM3c_V0R0o=";

function TeamCard({ team }) {
  const navigate = useNavigate();
  const teamName = team?.team?.name || team?.name || "Unknown Team";
  const upperName = teamName.toUpperCase();

  // 2. ONS MAP DIE API NAME NA JOU FISIESE PRENTE
  const localLogos = {
    'CARDIFF RUGBY': cardiffLogo,
    'CARDIFF': cardiffLogo,
    
    'CONNACHT': connachtLogo,
    'CONNACHT EAGLES': connachtLogo,
    
    'DRAGONS': dragonsLogo,
    
    'BENETTON': benettonLogo,
    
    'OSPREYS PS': ospreysLogo,
    
    'SCARLETS PS': scarletsLogo,
    'SCARLETS': scarletsLogo,
    
    'ZEBRE PARMA': zebreLogo,
    'ZEBRE': zebreLogo
  };

  // As die span in ons lys is, gebruik jou plaaslike prent. 
  // As dit 'n werkende API logo is (soos Sharks/Bulls), gebruik die API s'n.
  const finalLogo = localLogos[upperName] || team?.team?.logo || team?.logo || genericRugby;

  return (
    <div className="team-card" style={{ 
      minWidth: '300px', minHeight: '520px', 
      background: 'rgba(255, 255, 255, 0.02)', 
      border: '1px solid rgba(255, 255, 255, 0.1)', 
      borderRadius: '35px', padding: '50px 30px', 
      textAlign: 'center', display: 'flex', flexDirection: 'column', 
      justifyContent: 'space-between', flexShrink: 0,
      backdropFilter: 'blur(8px)', boxShadow: '0 15px 35px rgba(0,0,0,0.2)'
    }}>
      <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img 
          src={finalLogo} 
          alt={teamName} 
          style={{ width: '170px', height: '170px', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))' }} 
          onError={(e) => { e.target.src = genericRugby; }}
        />
      </div>
      <div>
        <h3 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '900', marginBottom: '25px' }}>
          {upperName}
        </h3>
        <button 
          onClick={() => navigate(`/compare?teamA=${encodeURIComponent(teamName)}`)}
          style={{ 
            background: '#FF6500', color: '#0B192C', border: 'none', 
            padding: '16px', borderRadius: '16px', fontWeight: '900', 
            width: '100%', cursor: 'pointer', fontSize: '1rem'
          }}
        >
          ANALYZE STATS
        </button>
      </div>
    </div>
  );
}

export default TeamCard;