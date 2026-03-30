import '../App.css'; 

const Footer = () => {
  console.log("Is die footer komponent aan die laai?"); 
  
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p>© 2026 Danika Rood | Open Window</p>
        <span className="footer-tagline">Built for the fans</span>
      </div>
    </footer>
  );
};

export default Footer;