# 🚀 ProjectFlow

ProjectFlow es una aplicación web Full Stack desarrollada para la gestión de proyectos de desarrollo de software. Permite administrar usuarios, proyectos y tareas, además de ofrecer un chat en tiempo real para mejorar la comunicación entre los integrantes del equipo.

---

# Objetivo

Desarrollar una aplicación web Full Stack utilizando tecnologías modernas de Front-End y Back-End para facilitar la administración de proyectos, tareas, usuarios y la comunicación en tiempo real dentro de un equipo de desarrollo.

---

# Arquitectura

El proyecto está dividido en dos aplicaciones independientes:

La comunicación entre ambas aplicaciones se realiza mediante peticiones HTTP utilizando Axios.

---

# Tecnologías utilizadas

### Front-End

- React
- Vite
- CSS3
- Axios
- Socket.io Client

### Back-End

- Node.js
- Express
- SQLite
- Socket.io
- CORS

### Herramientas

- Git
- GitHub
- Visual Studio Code

---

# Base de datos

Se eligió SQLite por las siguientes razones:

- No requiere instalar un servidor independiente.
- Es ligera y de fácil configuración.
- Permite almacenar información de forma persistente.
- Es ideal para proyectos académicos y prototipos Full Stack.
- Facilita el despliegue al mantener la base de datos en un único archivo.

Las tablas implementadas son:

- Users
- Projects
- Tasks
- Messages

---

# Funcionalidades

✔ Dashboard

✔ Gestión de Usuarios (CRUD)

✔ Gestión de Proyectos (CRUD)

✔ Gestión de Tareas (CRUD)

✔ Asignación de tareas a usuarios

✔ Chat en tiempo real mediante Socket.io

✔ Interfaz responsiva

---

# Instalación

### Front-End

```bash
cd frontend
npm install
npm run dev
```

Aplicación disponible en:

```
http://localhost:5173
```

### Back-End

```bash
cd backend
npm install
npm run dev
```

Servidor disponible en:

```
http://localhost:5001
```

## Clonar repositorio

```bash
git clone https://github.com/DezartuR94/Projectflow.git
```
