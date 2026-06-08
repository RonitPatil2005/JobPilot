const fs = require("fs");
const pdfParse = require("pdf-parse");

exports.analyzeResume = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        message: "No PDF file uploaded"
      });
    }

    console.log("Uploaded File:", req.file);

    const dataBuffer = fs.readFileSync(
      req.file.path
    );

    const pdfData = await pdfParse(
      dataBuffer
    );

    if (!pdfData.text) {
      return res.status(400).json({
        message:
          "Unable to extract text from PDF"
      });
    }

    const text =
      pdfData.text.toLowerCase();

    const keywords = [
      "react",
      "node",
      "express",
      "mongodb",
      "mysql",
      "java",
      "python",
      "javascript",
      "html",
      "css",
      "bootstrap",
      "tailwind",
      "aws",
      "docker",
      "git",
      "github",
      "c++",
      "php",
      "sql"
    ];

    const skills = [];

    keywords.forEach((skill) => {
      if (text.includes(skill)) {
        skills.push(skill);
      }
    });

    let suggestedRole =
      "Software Developer";

    if (
      skills.includes("react") &&
      skills.includes("javascript")
    ) {
      suggestedRole =
        "Frontend Developer";
    }

    if (
      skills.includes("node") &&
      skills.includes("mongodb")
    ) {
      suggestedRole =
        "MERN Stack Developer";
    }

    if (
      skills.includes("python")
    ) {
      suggestedRole =
        "Python Developer";
    }

    if (
      skills.includes("java")
    ) {
      suggestedRole =
        "Java Developer";
    }

    // delete uploaded file after processing
    if (
      fs.existsSync(req.file.path)
    ) {
      fs.unlinkSync(
        req.file.path
      );
    }

    res.json({
      skills,
      suggestedRole
    });

  } catch (err) {

    console.error(
      "Resume Analysis Error:"
    );
    console.error(err);

    res.status(500).json({
      message: err.message
    });

  }
};