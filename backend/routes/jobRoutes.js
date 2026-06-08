const express = require("express");
const router = express.Router();

const {
  getJobs,
} = require(
  "../controllers/jobController"
);

const protect = require(
  "../middleware/authMiddleware"
);

router.get(
  "/search",
  protect,
  getJobs
);

module.exports = router;