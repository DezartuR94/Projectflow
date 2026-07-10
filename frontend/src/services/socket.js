import { io } from "socket.io-client";

const socketUrl = import.meta.env.VITE_SOCKET_URL || "http://localhost:5002";

const socket = io(socketUrl);

export default socket;
