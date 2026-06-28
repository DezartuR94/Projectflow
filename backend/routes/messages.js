const express = require("express");
const router = express.Router();
const db = require("../database/db");

// Obtener mensajes
router.get("/", (req, res) => {
  db.all(
    "SELECT * FROM messages ORDER BY id DESC LIMIT 50",
    [],
    (error, rows) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }

      res.json(rows);
    },
  );
});

// Guardar mensaje
router.post("/", (req, res) => {
  const { username, message } = req.body;

  if (!username || !message) {
    return res.status(400).json({
      error: "username y message son obligatorios.",
    });
  }

  const sql = "INSERT INTO messages (username, message) VALUES (?, ?)";

  db.run(sql, [username, message], function (error) {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(201).json({
      id: this.lastID,
      username,
      message,
    });
  });
});

module.exports = router;
