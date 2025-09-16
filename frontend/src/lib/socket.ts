// src/services/socket.ts
import { io } from "socket.io-client";

let socket: ReturnType<typeof io> | null = null;

export const initSocket = () => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000", {
      transports: ["websocket"],
    });
  }
  return socket;
};

export const getSocket = () => {
  if (!socket) throw new Error("Socket not initialized");
  return socket;
};
