import "./Navbar.css";

const Navbar = ({ count }) => {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">Gestion des Utilisateurs</h1>
      <div className="badge-count">{count} utilisateurs</div>
    </nav>
  );
};

export default Navbar;
