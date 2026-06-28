import { useEffect, useState } from "react";
import api from "../services/api";
import "./Users.css";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "Activo",
    start_date: "",
    end_date: "",
  });

  const loadProjects = async () => {
    const res = await api.get("/projects");
    setProjects(res.data);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/projects", form);
    setForm({
      name: "",
      description: "",
      status: "Activo",
      start_date: "",
      end_date: "",
    });
    loadProjects();
  };

  const deleteProject = async (id) => {
    await api.delete(`/projects/${id}`);
    loadProjects();
  };

  return (
    <main className="page">
      <h2>Projects</h2>

      <form className="form-card" onSubmit={handleSubmit}>
        <input
          placeholder="Project name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option>Activo</option>
          <option>Pendiente</option>
          <option>Finalizado</option>
        </select>
        <input
          type="date"
          value={form.start_date}
          onChange={(e) => setForm({ ...form, start_date: e.target.value })}
          required
        />
        <input
          type="date"
          value={form.end_date}
          onChange={(e) => setForm({ ...form, end_date: e.target.value })}
          required
        />
        <button type="submit">Add Project</button>
      </form>

      <div className="table-card">
        {projects.map((project) => (
          <div className="table-row" key={project.id}>
            <div>
              <strong>{project.name}</strong>
              <p>{project.description}</p>
            </div>
            <span>{project.status}</span>
            <button
              className="delete-btn"
              onClick={() => deleteProject(project.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
