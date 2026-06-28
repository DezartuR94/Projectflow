# Arquitectura del Proyecto - ProjectFlow

ProjectFlow utiliza una arquitectura cliente-servidor. El front-end fue desarrollado con React y se comunica con el back-end mediante peticiones HTTP usando Axios. El back-end utiliza Node.js con Express para exponer una API REST, SQLite como base de datos relacional y Socket.io para comunicación en tiempo real.

## Diagrama de arquitectura

Usuario
↓
React Frontend
↓ Axios / HTTP
Node.js + Express API
↓
SQLite Database

Socket.io permite enviar y recibir mensajes en tiempo real entre los usuarios conectados.

## Componentes principales

- Front-end: interfaz de usuario desarrollada con React.
- Back-end: servidor de aplicación con Node.js y Express.
- Base de datos: SQLite para almacenar usuarios, proyectos, tareas y mensajes.
- Tiempo real: Socket.io para mensajes y notificaciones instantáneas.
- Control de versiones: Git y GitHub.
- Contenedores: Docker para facilitar el despliegue.
- Nube: hosting en la nube para disponibilidad y acceso remoto.
