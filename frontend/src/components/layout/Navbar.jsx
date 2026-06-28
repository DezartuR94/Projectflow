import "./Navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">
      <div>
        <h2>Dashboard</h2>
        <p>Welcome back, Arturo</p>
      </div>

      <input type="text" placeholder="Search projects..." />

      <div className="user-box">
        <div className="avatar">A</div>
        <div>
          <strong>Arturo</strong>
          <p>Administrator</p>
        </div>
      </div>
    </header>
  );
}
