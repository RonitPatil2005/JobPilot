const express = require("express");
const multer = require("multer");
const {
  analyzeResume
} = require("../controllers/resumeController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() +
      "-" +
      file.originalname
    );
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {

    if (
      file.mimetype ===
      "application/pdf"
    ) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only PDF files allowed"
        )
      );
    }
  },
});

router.post(
  "/analyze",
  upload.single("resume"),
  analyzeResume
);

module.exports = router;