import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Opgedateerde pad: '..' skuif uit 'components' na 'src'
// Ons gebruik die presiese naam van die lêer met .svg aan die einde
import myAppLogo from '../LOGO FINAAL.svg'; 

function Navbar() {
  const location = useLocation();

  const getLinkStyle = (path) => ({
    color: location.pathname === path ? '#FF6500' : 'white',
    textDecoration: 'none',
    fontWeight: '800',
    fontSize: '0.95rem',
    letterSpacing: '2px',
    transition: 'all 0.3s ease',
    borderBottom: location.pathname === path ? '2px solid #FF6500' : '2px solid transparent',
    paddingBottom: '5px'
  });

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '15px 40px',
      background: '#0B192C',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      
      {/* LINKS: LOGO EN NAAM */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <img src={myAppLogo} alt="Logo" style={{ height: '40px', width: 'auto' }} />
        <span style={{ color: 'white', fontWeight: '900', fontSize: '1.4rem' }}>
          SCRUM<span style={{ color: '#FF6500' }}>ANALYTICS</span>
        </span>
      </div>

      {/* MIDDEL: NAV LINKS MET GROOT SPASIE */}
      <div style={{ 
        display: 'flex', 
        gap: '60px', 
        position: 'absolute', 
        left: '50%', 
        transform: 'translateX(-50%)' 
      }}>
        <Link to="/" style={getLinkStyle('/')}>HOME</Link>
        <Link to="/compare" style={getLinkStyle('/compare')}>COMPARE</Link>
        <Link to="/timeline" style={getLinkStyle('/timeline')}>TIMELINE</Link>
      </div>

      {/* REGS: LEEG VIR BALANS */}
      <div style={{ width: '150px' }}></div>
    </nav>
  );
}

export default Navbar;