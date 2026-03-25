import { io } from "socket.io-client";

export const socket = io("https://sigma-squad.onrender.com", {
  transports: ["websocket"],
});