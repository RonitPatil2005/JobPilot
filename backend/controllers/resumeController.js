const fs = require("fs");
const pdfParse = require("pdf-parse");
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// ------------------------------------
// Existing keyword-based fallback
// ------------------------------------
function analyzeWithKeywords(text) {

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


  // ------------------------------------
  // Role detection with priority
  // ------------------------------------

  let suggestedRole =
    "Software Developer";


  // 1. MERN Stack
  if (
    skills.includes("react") &&
    skills.includes("node") &&
    skills.includes("express") &&
    skills.includes("mongodb")
  ) {

    suggestedRole =
      "MERN Stack Developer";

  }

  // 2. Frontend
  else if (
    skills.includes("react") &&
    skills.includes("javascript")
  ) {

    suggestedRole =
      "Frontend Developer";

  }

  // 3. Backend
  else if (
    skills.includes("node") &&
    skills.includes("express")
  ) {

    suggestedRole =
      "Backend Developer";

  }

  // 4. Python
  else if (
    skills.includes("python")
  ) {

    suggestedRole =
      "Python Developer";

  }

  // 5. Java
  else if (
    skills.includes("java")
  ) {

    suggestedRole =
      "Java Developer";

  }


  return {
    skills,
    suggestedRole
  };
}

// ------------------------------------
// Gemini Resume Analysis
// ------------------------------------
async function analyzeWithGemini(resumeText) {

  const prompt = `
You are an expert technical recruiter and resume analyzer.

Analyze the following resume.

Return ONLY valid JSON.

Required JSON format:

{
  "skills": [],
  "suggestedRole": "",
  "alternativeRoles": [],
  "atsScore": 0,
  "strengths": [],
  "weaknesses": [],
  "suggestions": []
}

Rules:

1. skills:
   - Extract important technical skills from the resume.
   - Include programming languages, frameworks, databases, cloud,
     tools and important technical technologies.

2. suggestedRole:
   - Select the single most suitable technical job role based on
     the candidate's actual skills and projects.

3. alternativeRoles:
   - Give 2 to 4 other suitable technical roles.

4. atsScore:
   - Give an ATS-style score from 0 to 100.
   - Consider skills, projects, experience, education,
     keywords and resume structure.
   - This is an ATS-style estimate, not an official ATS score.

5. strengths:
   - Give 3 to 5 important strengths.

6. weaknesses:
   - Give 2 to 5 areas that can be improved.

7. suggestions:
   - Give 3 to 5 practical resume improvement suggestions.

Do not invent skills or experience.
Only use information present in the resume.

Resume:

${resumeText}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.7-flash",
    contents: prompt,
    config: {
      temperature: 0.2,
      responseMimeType: "application/json"
    }
  });

  const resultText = response.text;

  if (!resultText) {
    throw new Error("Gemini returned empty response");
  }

  const result = JSON.parse(resultText);

  return result;
}


// ------------------------------------
// Main Controller
// ------------------------------------
exports.analyzeResume = async (req, res) => {

  let filePath = null;

  try {

    if (!req.file) {
      return res.status(400).json({
        message: "No PDF file uploaded"
      });
    }

    filePath = req.file.path;

    console.log("Uploaded File:", req.file);

    const dataBuffer = fs.readFileSync(filePath);

    const pdfData = await pdfParse(dataBuffer);

    if (!pdfData.text || !pdfData.text.trim()) {
      return res.status(400).json({
        message: "Unable to extract text from PDF"
      });
    }

    const resumeText = pdfData.text.trim();
    const normalizedText = resumeText.toLowerCase();

    // ------------------------------------
    // First try Gemini
    // ------------------------------------
    try {

      console.log("Trying Gemini Resume Analysis...");

      const geminiResult =
        await analyzeWithGemini(resumeText);

      console.log("Gemini analysis successful");

      return res.json({
        ...geminiResult,
        analysisSource: "gemini"
      });

    } catch (geminiError) {

      console.error(
        "Gemini Analysis Failed:"
      );

      console.error(geminiError.message);

      // ------------------------------------
      // Gemini failed → keyword fallback
      // ------------------------------------

      console.log(
        "Using keyword-based fallback..."
      );

      const fallbackResult =
        analyzeWithKeywords(normalizedText);

      return res.json({
        ...fallbackResult,

        alternativeRoles: [],

        atsScore: null,

        strengths: [],

        weaknesses: [],

        suggestions: [
          "AI analysis was temporarily unavailable.",
          "Resume skills and role were detected using keyword analysis."
        ],

        analysisSource: "keyword-fallback"
      });
    }

  } catch (err) {

    console.error(
      "Resume Analysis Error:"
    );

    console.error(err);

    res.status(500).json({
      message: err.message
    });

  } finally {

    // ------------------------------------
    // Always delete uploaded PDF
    // ------------------------------------

    if (
      filePath &&
      fs.existsSync(filePath)
    ) {

      try {

        fs.unlinkSync(filePath);

      } catch (deleteError) {

        console.error(
          "Unable to delete uploaded file:",
          deleteError.message
        );

      }
    }
  }
};