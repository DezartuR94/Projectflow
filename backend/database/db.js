const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "projectflow.db");

const db = new sqlite3.Database(dbPath, (error) => {
  if (error) {
    console.error("Error al conectar con SQLite:", error.message);
  } else {
    console.log("Base de datos SQLite conectada correctamente.");
  }
});

db.serialize(() => {
  // Configuraciones de rendimiento e integridad
  db.run("PRAGMA foreign_keys = ON");
  db.run("PRAGMA journal_mode = WAL");
  db.run("PRAGMA synchronous = NORMAL");
  db.run("PRAGMA busy_timeout = 5000");

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      role TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'Activo',
      start_date TEXT NOT NULL,
      end_date TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      priority TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'Pendiente',
      project_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (project_id) REFERENCES projects(id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Índices para acelerar consultas frecuentes
  db.run(`
    CREATE INDEX IF NOT EXISTS idx_tasks_project_id
    ON tasks(project_id)
  `);

  db.run(`
    CREATE INDEX IF NOT EXISTS idx_tasks_user_id
    ON tasks(user_id)
  `);

  db.run(`
    CREATE INDEX IF NOT EXISTS idx_tasks_status
    ON tasks(status)
  `);

  db.run(`
    CREATE INDEX IF NOT EXISTS idx_tasks_created_at
    ON tasks(created_at)
  `);

  db.run(`
    CREATE INDEX IF NOT EXISTS idx_projects_status
    ON projects(status)
  `);

  db.run(`
    CREATE INDEX IF NOT EXISTS idx_messages_created_at
    ON messages(created_at)
  `);
});

module.exports = db;
