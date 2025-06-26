import { Server } from "socket.io";

let io;
const userSocketMap = {}; // { userId: socketId }

export function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: ["chat-qmt14fcxw-varshiths-projects-3c9d2af7.vercel.app"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      console.log("A user disconnected", socket.id);
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });
}

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

export { io };
