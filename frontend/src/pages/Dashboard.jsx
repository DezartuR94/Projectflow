import { useEffect, useState } from "react";
import { FolderKanban, CheckSquare, Users, MessageSquare } from "lucide-react";
import api from "../services/api";
import StatCard from "../components/common/StatCard";
import "./Dashboard.css";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [projectsRes, tasksRes, usersRes, messagesRes] =
          await Promise.all([
            api.get("/projects"),
            api.get("/tasks"),
            api.get("/users"),
            api.get("/messages"),
          ]);

        setProjects(projectsRes.data);
        setTasks(tasksRes.data);
        setUsers(usersRes.data);
        setMessages(messagesRes.data);
      } catch (error) {
        console.error("Error al cargar datos del dashboard:", error);
      }
    }

    loadData();
  }, []);

  return (
    <main className="dashboard">
      <section className="stats-grid">
        <StatCard
          title="Projects"
          value={projects.length}
          subtitle="+2 this week"
          icon={<FolderKanban size={22} />}
        />
        <StatCard
          title="Tasks"
          value={tasks.length}
          subtitle="12 completed today"
          icon={<CheckSquare size={22} />}
        />
        <StatCard
          title="Users"
          value={users.length}
          subtitle="3 online"
          icon={<Users size={22} />}
        />
        <StatCard
          title="Messages"
          value={messages.length}
          subtitle="8 unread"
          icon={<MessageSquare size={22} />}
        />
      </section>

      <section className="dashboard-panels">
        <div className="panel">
          <h3>Recent Projects</h3>

          {projects.length === 0 ? (
            <p className="empty">No projects registered yet.</p>
          ) : (
            projects.slice(0, 5).map((project) => (
              <div className="list-item" key={project.id}>
                <strong>{project.name}</strong>
                <span>{project.status}</span>
              </div>
            ))
          )}
        </div>

        <div className="panel">
          <h3>Recent Activity</h3>

          <div className="activity-item">
            📝 New tasks and projects will appear here.
          </div>
          <div className="activity-item">✅ API connected successfully.</div>
          <div className="activity-item">
            💬 Real-time chat ready with Socket.io.
          </div>
        </div>
      </section>
    </main>
  );
}
