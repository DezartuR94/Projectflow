import { useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Chat from "./pages/Chat";
import "./styles/global.css";

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="app-layout">
      <Sidebar setActivePage={setActivePage} />

      <div className="main-content">
        <Navbar activePage={activePage} />

        {activePage === "dashboard" && <Dashboard />}
        {activePage === "users" && <Users />}
        {activePage === "projects" && <Projects />}
        {activePage === "tasks" && <Tasks />}
        {activePage === "chat" && <Chat />}
      </div>
    </div>
  );
}
