import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="topbar">
      <a className="brand-lockup" href="#top" aria-label="Biryani Restaurant home">
        <span className="brand-mark" aria-hidden="true">B</span>
        <span>
          <strong>Biryani Restaurant</strong>
          <small>Operations</small>
        </span>
      </a>
      <nav className="top-navigation" aria-label="Main navigation">
        <a href="/dashboard#orders">Orders</a>
        <a href="/dashboard#menu">Menu</a>
        <Link to="/customers">Customers</Link>
        <button className="logout-button" onClick={() => { localStorage.removeItem("token"); window.location.href = "/login"; }}>
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;
