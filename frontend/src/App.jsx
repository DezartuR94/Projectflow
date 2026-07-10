import { useEffect, useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Chat from "./pages/Chat";
import socket from "./services/socket";
import "./styles/global.css";

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    socket.on("receiveNotification", (data) => {
      console.log("Notificación recibida en React:", data);

      setNotification(data);

      setTimeout(() => {
        setNotification(null);
      }, 4000);
    });

    return () => {
      socket.off("receiveNotification");
    };
  }, []);

  return (
    <div className="app-layout">
      {notification && (
        <div
          className={`toast-notification toast-${notification.type || "info"}`}
        >
          <strong>{notification.title}</strong>
          <span>{notification.message}</span>
        </div>
      )}

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
