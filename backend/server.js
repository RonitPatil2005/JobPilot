const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

connectDB();

const app = express();

/* CORS */

app.use(cors());

/* Middleware */

app.use(express.json());

/* Health Check Route */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "JobPilot Backend Running 🚀"
  });
});

/* Routes */

app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

app.use(
  "/api/resume",
  require("./routes/resumeRoutes")
);

app.use(
  "/api/jobs",
  require("./routes/jobRoutes")
);

/* 404 Route */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API Route Not Found"
  });
});

/* Error Handler */

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
});

/* Start Server */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});