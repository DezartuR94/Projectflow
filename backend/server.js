const express = require("express");
const cors = require("cors");

const db = require("./database/db");

const usersRoutes = require("./routes/users");
const projectsRoutes = require("./routes/projects");
const tasksRoutes = require("./routes/tasks");
const messagesRoutes = require("./routes/messages");

const app = express();

const PORT = 5001;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/users", usersRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/messages", messagesRoutes);

// Ruta principal
app.get("/", (req, res) => {
  res.json({
    message: "🚀 ProjectFlow API funcionando correctamente",
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
