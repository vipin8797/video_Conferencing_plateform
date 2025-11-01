import {Server} from "socket.io";
import cors from "cors";

export const connectToSocket = (server) => {
  const io = new Server(server);
  return io;
}