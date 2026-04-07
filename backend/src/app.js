import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import taskRouter from "./routes/task.routes.js";
import adminRouter from "./routes/admin.routes.js";

const app = express();

// Allowed frontend URLs
const allowedOrigins = [
  "http://localhost:5173",
  process.env.CORS_ORIGIN,
].filter(Boolean);

// CORS middleware
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health check route
app.get("/", (req, res) => {
  res.send("TaskFlow API is running...");
});

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/admin", adminRouter);

export { app };