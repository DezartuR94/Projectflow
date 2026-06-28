const express = require("express");
const router = express.Router();
const db = require("../database/db");

// Obtener todos los proyectos
router.get("/", (req, res) => {
  db.all("SELECT * FROM projects ORDER BY id DESC", [], (error, rows) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(rows);
  });
});

// Crear proyecto
router.post("/", (req, res) => {
  const { name, description, status, start_date, end_date } = req.body;

  if (!name || !description || !start_date || !end_date) {
    return res.status(400).json({
      error:
        "Los campos name, description, start_date y end_date son obligatorios.",
    });
  }

  const sql = `
    INSERT INTO projects (name, description, status, start_date, end_date)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(
    sql,
    [name, description, status || "Activo", start_date, end_date],
    function (error) {
      if (error) {
        return res.status(500).json({ error: error.message });
      }

      res.status(201).json({
        id: this.lastID,
        name,
        description,
        status: status || "Activo",
        start_date,
        end_date,
      });
    },
  );
});

// Actualizar proyecto
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, description, status, start_date, end_date } = req.body;

  if (!name || !description || !status || !start_date || !end_date) {
    return res.status(400).json({
      error: "Todos los campos son obligatorios.",
    });
  }

  const sql = `
    UPDATE projects
    SET name = ?, description = ?, status = ?, start_date = ?, end_date = ?
    WHERE id = ?
  `;

  db.run(
    sql,
    [name, description, status, start_date, end_date, id],
    function (error) {
      if (error) {
        return res.status(500).json({ error: error.message });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: "Proyecto no encontrado." });
      }

      res.json({
        id,
        name,
        description,
        status,
        start_date,
        end_date,
      });
    },
  );
});

// Eliminar proyecto
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM projects WHERE id = ?", [id], function (error) {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "Proyecto no encontrado." });
    }

    res.json({ message: "Proyecto eliminado correctamente." });
  });
});

module.exports = router;
