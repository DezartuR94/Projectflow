import { useEffect, useState } from "react";
import api from "../services/api";
import "./Users.css";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Media",
    status: "Pendiente",
    project_id: "",
    user_id: "",
  });

  const loadData = async () => {
    const [tasksRes, projectsRes, usersRes] = await Promise.all([
      api.get("/tasks"),
      api.get("/projects"),
      api.get("/users"),
    ]);

    setTasks(tasksRes.data);
    setProjects(projectsRes.data);
    setUsers(usersRes.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/tasks", form);
    setForm({
      title: "",
      description: "",
      priority: "Media",
      status: "Pendiente",
      project_id: "",
      user_id: "",
    });
    loadData();
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    loadData();
  };

  return (
    <main className="page">
      <h2>Tasks</h2>

      <form className="form-card" onSubmit={handleSubmit}>
        <input
          placeholder="Task title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />

        <select
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
        >
          <option>Alta</option>
          <option>Media</option>
          <option>Baja</option>
        </select>

        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option>Pendiente</option>
          <option>En progreso</option>
          <option>Completada</option>
        </select>

        <select
          value={form.project_id}
          onChange={(e) => setForm({ ...form, project_id: e.target.value })}
          required
        >
          <option value="">Select project</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>

        <select
          value={form.user_id}
          onChange={(e) => setForm({ ...form, user_id: e.target.value })}
          required
        >
          <option value="">Assign user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <button type="submit">Add Task</button>
      </form>

      <div className="table-card">
        {tasks.map((task) => (
          <div className="table-row" key={task.id}>
            <div>
              <strong>{task.title}</strong>
              <p>
                {task.description} | {task.project_name} | {task.user_name}
              </p>
            </div>

            <span>{task.status}</span>

            <button className="delete-btn" onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
