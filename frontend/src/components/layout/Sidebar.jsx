import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  MessageSquare,
  Settings,
} from "lucide-react";

import "./Sidebar.css";

export default function Sidebar({ setActivePage }) {
  return (
    <aside className="sidebar">
      <h1>🚀 ProjectFlow</h1>
      <p>Project Management</p>

      <nav>
        <button onClick={() => setActivePage("dashboard")}>
          <LayoutDashboard size={18} /> Dashboard
        </button>

        <button onClick={() => setActivePage("projects")}>
          <FolderKanban size={18} /> Projects
        </button>

        <button onClick={() => setActivePage("tasks")}>
          <CheckSquare size={18} /> Tasks
        </button>

        <button onClick={() => setActivePage("users")}>
          <Users size={18} /> Users
        </button>

        <button onClick={() => setActivePage("chat")}>
          <MessageSquare size={18} /> Chat
        </button>

        <button>
          <Settings size={18} /> Settings
        </button>
      </nav>
    </aside>
  );
}
