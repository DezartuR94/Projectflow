# 🚀 ProjectFlow

ProjectFlow es una aplicación web Full Stack desarrollada para la administración de proyectos de software. En esta segunda fase se evolucionó la arquitectura de la aplicación incorporando microservicios, notificaciones en tiempo real mediante WebSockets, contenerización con Docker y optimizaciones de rendimiento.

---

# Objetivo

Escalar la aplicación Full Stack desarrollada en la fase anterior mediante una arquitectura basada en microservicios, implementando comunicación en tiempo real, contenerización con Docker y mejoras de rendimiento para obtener una aplicación más robusta y escalable.

---

# Arquitectura

La solución está compuesta por tres servicios principales:

- **Frontend (React + Vite)**
- **Backend (Node.js + Express + SQLite)**
- **Notification Service (Microservicio independiente con Socket.IO)**

### Comunicación entre servicios

- React → Backend mediante **REST API (HTTP)**.
- Backend → Notification Service mediante **HTTP**.
- Notification Service → Frontend mediante **Socket.IO (WebSockets)**.

---

# Arquitectura del sistema

El diagrama de arquitectura se encuentra en:

```
docs/arquitectura-projectflow.png
```

---

# Tecnologías utilizadas

## Front-End

- React
- Vite
- Axios
- CSS3
- Socket.IO Client

## Back-End

- Node.js
- Express
- SQLite
- Socket.IO
- Axios
- Compression
- CORS

## Microservicio

- Express
- Socket.IO

## Contenerización

- Docker
- Docker Compose

## Herramientas

- Git
- GitHub
- Visual Studio Code

---

# Base de datos

Se utilizó SQLite por ser una base de datos ligera, rápida y sencilla de desplegar.

Tablas implementadas:

- Users
- Projects
- Tasks
- Messages

---

# Funcionalidades

## Gestión

- CRUD de Usuarios
- CRUD de Proyectos
- CRUD de Tareas

## Comunicación

- Chat en tiempo real
- Notificaciones automáticas
- WebSockets mediante Socket.IO

## Dashboard

- Estadísticas
- Actividad reciente

## Arquitectura

- Microservicio de notificaciones
- Comunicación entre servicios
- Docker Compose
- Variables de entorno

---

# Optimizaciones implementadas

Durante esta fase se realizaron distintas optimizaciones para mejorar el rendimiento:

- Índices en SQLite.
- Caché temporal para consultas GET.
- Compresión HTTP mediante Compression.
- Minificación del Frontend con Vite.
- Optimización del despliegue con Docker.

---

# Pruebas de rendimiento

Las pruebas se realizaron utilizando:

```
Autocannon
```

Resultados obtenidos:

- Más de **14,000 solicitudes por segundo** en pruebas sobre `/api/tasks`.
- Latencia promedio inferior a **1 ms** después de la optimización.
- Correcto funcionamiento bajo múltiples conexiones simultáneas.

---

# Instalación local

## Backend

```bash
cd backend
npm install
npm run dev
```

Servidor:

```
http://localhost:5001
```

---

## Notification Service

```bash
cd notification-service
npm install
npm run dev
```

Servidor:

```
http://localhost:5002
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Aplicación:

```
http://localhost:5173
```

---

# Ejecución con Docker

Construir los contenedores:

```bash
docker compose build
```

Levantar la aplicación:

```bash
docker compose up
```

Detener los servicios:

```bash
docker compose down
```

---

# Repositorio

```bash
git clone https://github.com/DezartuR94/Projectflow.git
```

---

# Video demostrativo

Se agregará el enlace del video una vez publicado en YouTube.

---

# Autor

**Arturo Vásquez**

Proyecto académico desarrollado para la materia de Desarrollo Full Stack.
