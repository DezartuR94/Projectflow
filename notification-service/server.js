const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const PORT = 5002;

app.use(cors());
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.json({
    message: "Notification Service funcionando correctamente",
  });
});

io.on("connection", (socket) => {
  console.log("Cliente conectado al Notification Service:", socket.id);

  socket.emit("receiveNotification", {
    title: "Conexión establecida",
    message: "Notificaciones en tiempo real activas",
  });

  socket.on("sendMessage", (data) => {
    io.emit("receiveMessage", data);
  });

  socket.on("sendNotification", (data) => {
    io.emit("receiveNotification", data);
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

app.post("/notify", (req, res) => {
  console.log("Notificación recibida:", req.body);

  const { title, message, type } = req.body;

  io.emit("receiveNotification", {
    title: title || "ProjectFlow",
    message: message || "Nueva actualización en el sistema",
    type: type || "info",
    createdAt: new Date().toISOString(),
  });

  res.json({
    success: true,
    message: "Notificación enviada correctamente",
  });
});

server.listen(PORT, () => {
  console.log(`Notification Service ejecutándose en http://localhost:${PORT}`);
});
