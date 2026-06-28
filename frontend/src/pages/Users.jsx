import { useEffect, useState } from "react";
import api from "../services/api";
import "./Users.css";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", role: "Developer" });

  const loadUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/users", form);
    setForm({ name: "", email: "", role: "Developer" });
    loadUsers();
  };

  const deleteUser = async (id) => {
    await api.delete(`/users/${id}`);
    loadUsers();
  };

  return (
    <main className="page">
      <h2>Users</h2>

      <form className="form-card" onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option>Administrator</option>
          <option>Developer</option>
          <option>Tester</option>
        </select>

        <button type="submit">Add User</button>
      </form>

      <div className="table-card">
        {users.map((user) => (
          <div className="table-row" key={user.id}>
            <div>
              <strong>{user.name}</strong>
              <p>{user.email}</p>
            </div>
            <span>{user.role}</span>
            <button className="delete-btn" onClick={() => deleteUser(user.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
