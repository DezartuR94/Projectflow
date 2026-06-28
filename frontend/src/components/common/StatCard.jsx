import "./StatCard.css";

export default function StatCard({ title, value, subtitle, icon }) {
  return (
    <div className="stat-card">
      <div className="icon">{icon}</div>

      <h2>{value}</h2>

      <h4>{title}</h4>

      <p>{subtitle}</p>
    </div>
  );
}
