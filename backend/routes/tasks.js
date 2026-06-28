const express = require("express");
const router = express.Router();
const db = require("../database/db");

// Obtener todas las tareas
router.get("/", (req, res) => {
  const sql = `
    SELECT 
      tasks.*,
      projects.name AS project_name,
      users.name AS user_name
    FROM tasks
    LEFT JOIN projects ON tasks.project_id = projects.id
    LEFT JOIN users ON tasks.user_id = users.id
    ORDER BY tasks.id DESC
  `;

  db.all(sql, [], (error, rows) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(rows);
  });
});

// Crear tarea
router.post("/", (req, res) => {
  const { title, description, priority, status, project_id, user_id } =
    req.body;

  if (!title || !description || !priority || !project_id || !user_id) {
    return res.status(400).json({
      error:
        "title, description, priority, project_id y user_id son obligatorios.",
    });
  }

  const sql = `
    INSERT INTO tasks (title, description, priority, status, project_id, user_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.run(
    sql,
    [title, description, priority, status || "Pendiente", project_id, user_id],
    function (error) {
      if (error) {
        return res.status(500).json({ error: error.message });
      }

      res.status(201).json({
        id: this.lastID,
        title,
        description,
        priority,
        status: status || "Pendiente",
        project_id,
        user_id,
      });
    },
  );
});

// Actualizar tarea
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, priority, status, project_id, user_id } =
    req.body;

  if (
    !title ||
    !description ||
    !priority ||
    !status ||
    !project_id ||
    !user_id
  ) {
    return res.status(400).json({
      error: "Todos los campos son obligatorios.",
    });
  }

  const sql = `
    UPDATE tasks
    SET title = ?, description = ?, priority = ?, status = ?, project_id = ?, user_id = ?
    WHERE id = ?
  `;

  db.run(
    sql,
    [title, description, priority, status, project_id, user_id, id],
    function (error) {
      if (error) {
        return res.status(500).json({ error: error.message });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: "Tarea no encontrada." });
      }

      res.json({
        id,
        title,
        description,
        priority,
        status,
        project_id,
        user_id,
      });
    },
  );
});

// Eliminar tarea
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM tasks WHERE id = ?", [id], function (error) {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "Tarea no encontrada." });
    }

    res.json({ message: "Tarea eliminada correctamente." });
  });
});

module.exports = router;
