import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { createServer } from "http";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { initializeSocket } from "./lib/socket.js";

dotenv.config();

const app = express();
const server = createServer(app); // ✅ create server from THIS app
initializeSocket(server);         // ✅ init socket on same server

const PORT = process.env.PORT || 5000;
const __dirnameResolved = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirnameResolved, "../frontend/dist")));

  app.get("/*", (req, res) => {      // leading slash ✓
    res.sendFile(
      path.join(__dirnameResolved, "../frontend/dist/index.html")
    );
  });
}

server.listen(PORT, () => {
  console.log("✅ Server running on PORT:", PORT);
  connectDB();
});
