const express = require("express");
const cors = require("cors");
const compression = require("compression");

const db = require("./database/db");

const usersRoutes = require("./routes/users");
const projectsRoutes = require("./routes/projects");
const tasksRoutes = require("./routes/tasks");
const messagesRoutes = require("./routes/messages");

const { cacheResponse, invalidateCache } = require("./middlewares/cache");

const app = express();

const PORT = process.env.PORT || 5001;

// Evita mostrar información innecesaria del servidor
app.disable("x-powered-by");

// Middlewares
app.use(cors());
app.use(compression());
app.use(express.json({ limit: "1mb" }));

// Caché temporal e invalidación para rutas de la API
app.use("/api", invalidateCache);
app.use("/api", cacheResponse(5000));

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
