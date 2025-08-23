const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();

// MiddleWare
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB Connection
connectDB();

// CORS Handler
const origins = [
    "https://task-reactfrontend.netlify.app",
    "https://mern-task-management-i7cj.onrender.com",
    "http://localhost:5050",
]
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || origins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/reports", reportRoutes);

// Server show image
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
