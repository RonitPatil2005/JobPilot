const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const resumeRoutes =
  require("./routes/resumeRoutes");


dotenv.config();

const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

app.use(
  "/api/resume",
  resumeRoutes
);

app.use(
  "/api/jobs",
  require("./routes/jobRoutes")
);

const PORT =
  process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});