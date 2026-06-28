import { useEffect, useState } from "react";
import api from "../services/api";
import socket from "../services/socket";
import "./Chat.css";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState({
    username: "Arturo",
    message: "",
  });

  const loadMessages = async () => {
    const res = await api.get("/messages");
    setMessages(res.data.reverse());
  };

  useEffect(() => {
    loadMessages();

    socket.on("receiveMessage", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!form.message.trim()) return;

    const newMessage = {
      username: form.username,
      message: form.message,
    };

    await api.post("/messages", newMessage);

    socket.emit("sendMessage", newMessage);

    setForm({ ...form, message: "" });
  };

  return (
    <main className="chat-page">
      <h2>Real-Time Chat</h2>

      <div className="chat-box">
        <div className="messages">
          {messages.map((msg, index) => (
            <div className="message" key={index}>
              <strong>{msg.username}</strong>
              <p>{msg.message}</p>
            </div>
          ))}
        </div>

        <form className="chat-form" onSubmit={sendMessage}>
          <input
            placeholder="Your name"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />

          <input
            placeholder="Write a message..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />

          <button type="submit">Send</button>
        </form>
      </div>
    </main>
  );
}
