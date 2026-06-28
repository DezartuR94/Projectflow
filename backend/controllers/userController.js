const db = require("../database/db");

// Obtener todos los usuarios
exports.getUsers = (req, res) => {
  db.all("SELECT * FROM users ORDER BY id DESC", [], (err, rows) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(rows);
  });
};

// Crear usuario
exports.createUser = (req, res) => {
  const { name, email, role } = req.body;

  db.run(
    "INSERT INTO users(name,email,role) VALUES(?,?,?)",
    [name, email, role],
    function (err) {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Usuario creado",
        id: this.lastID,
      });
    },
  );
};

// Actualizar usuario
exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;

  db.run(
    "UPDATE users SET name=?, email=?, role=? WHERE id=?",
    [name, email, role, id],
    function (err) {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Usuario actualizado",
      });
    },
  );
};

// Eliminar usuario
exports.deleteUser = (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM users WHERE id=?", [id], function (err) {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Usuario eliminado",
    });
  });
};
