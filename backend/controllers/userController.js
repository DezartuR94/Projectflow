const db = require("../database/db");
const sendNotification = require("../services/notificationService");

// Obtener todos los usuarios
exports.getUsers = (req, res) => {
  db.all("SELECT * FROM users ORDER BY id DESC", [], (error, rows) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(rows);
  });
};

// Crear usuario
exports.createUser = (req, res) => {
  const { name, email, role } = req.body;

  if (!name || !email || !role) {
    return res.status(400).json({
      error: "Los campos name, email y role son obligatorios.",
    });
  }

  db.run(
    "INSERT INTO users(name, email, role) VALUES (?, ?, ?)",
    [name, email, role],
    function (error) {
      if (error) {
        return res.status(500).json({ error: error.message });
      }

      sendNotification(
        "Nuevo usuario registrado",
        `Se agregó al usuario: ${name}`,
        "success",
      );

      res.status(201).json({
        message: "Usuario creado",
        id: this.lastID,
        name,
        email,
        role,
      });
    },
  );
};

// Actualizar usuario
exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;

  if (!name || !email || !role) {
    return res.status(400).json({
      error: "Los campos name, email y role son obligatorios.",
    });
  }

  db.run(
    "UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?",
    [name, email, role, id],
    function (error) {
      if (error) {
        return res.status(500).json({ error: error.message });
      }

      if (this.changes === 0) {
        return res.status(404).json({
          error: "Usuario no encontrado.",
        });
      }

      sendNotification(
        "Usuario actualizado",
        `Se actualizó al usuario: ${name}`,
        "warning",
      );

      res.json({
        message: "Usuario actualizado",
        id,
        name,
        email,
        role,
      });
    },
  );
};

// Eliminar usuario
exports.deleteUser = (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM users WHERE id = ?", [id], function (error) {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({
        error: "Usuario no encontrado.",
      });
    }

    sendNotification(
      "Usuario eliminado",
      `Se eliminó al usuario con ID: ${id}`,
      "danger",
    );

    res.json({
      message: "Usuario eliminado",
    });
  });
};
