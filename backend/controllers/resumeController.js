const fs = require("fs");
const pdfParse = require("pdf-parse");
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// ------------------------------------
// Keyword-based fallback
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

  let suggestedRole = "Software Developer";

  if (
    skills.includes("react") &&
    skills.includes("javascript")
  ) {
    suggestedRole = "Frontend Developer";
  }

  if (
    skills.includes("node") &&
    skills.includes("mongodb")
  ) {
    suggestedRole = "MERN Stack Developer";
  }

  if (skills.includes("python")) {
    suggestedRole = "Python Developer";
  }

  if (skills.includes("java")) {
    suggestedRole = "Java Developer";
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
Extract important technical skills from the resume.

Include:
- Programming languages
- Frameworks
- Libraries
- Databases
- Cloud technologies
- Developer tools
- APIs
- Important technical concepts

2. suggestedRole:
Select ONE most suitable technical job role based only on
the candidate's actual skills, projects and experience.

3. alternativeRoles:
Give 2 to 4 other suitable technical roles.

4. atsScore:
Give an ATS-style score from 0 to 100.

Consider:
- Technical skills
- Projects
- Experience
- Education
- Keywords
- Resume structure

This is only an ATS-style estimate.

5. strengths:
Give 3 to 5 important strengths.

6. weaknesses:
Give 2 to 5 areas that can be improved.

7. suggestions:
Give 3 to 5 practical resume improvement suggestions.

IMPORTANT:
Do not invent skills.
Do not invent experience.
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
    throw new Error(
      "Gemini returned empty response"
    );
  }

  const result =
    JSON.parse(resultText);

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

    console.log(
      "Uploaded File:",
      req.file
    );

    // ------------------------------------
    // Read PDF
    // ------------------------------------

    const dataBuffer =
      fs.readFileSync(filePath);

    const pdfData =
      await pdfParse(dataBuffer);

    if (
      !pdfData.text ||
      !pdfData.text.trim()
    ) {

      return res.status(400).json({
        message:
          "Unable to extract text from PDF"
      });

    }

    const resumeText =
      pdfData.text.trim();

    const normalizedText =
      resumeText.toLowerCase();


    // ------------------------------------
    // Try Gemini
    // ------------------------------------

    try {

      console.log(
        "Trying Gemini Resume Analysis..."
      );

      const geminiResult =
        await analyzeWithGemini(
          resumeText
        );

      console.log(
        "Gemini analysis successful"
      );

      // IMPORTANT:
      // Print exactly what is being
      // returned to frontend

      console.log(
        "Gemini Result:",
        JSON.stringify(
          geminiResult,
          null,
          2
        )
      );

      return res.json({

        ...geminiResult,

        analysisSource: "gemini"

      });

    } catch (geminiError) {

      console.error(
        "Gemini Analysis Failed:"
      );

      console.error(
        geminiError.message
      );

      // ------------------------------------
      // Keyword fallback
      // ------------------------------------

      console.log(
        "Using keyword-based fallback..."
      );

      const fallbackResult =
        analyzeWithKeywords(
          normalizedText
        );

      return res.json({

        ...fallbackResult,

        alternativeRoles: [],

        atsScore: null,

        strengths: [],

        weaknesses: [],

        suggestions: [
          "AI analysis is temporarily unavailable due to a technical error."
        ],

        analysisSource:
          "keyword-fallback"

      });

    }

  } catch (err) {

    console.error(
      "Resume Analysis Error:"
    );

    console.error(err);

    return res.status(500).json({

      message:
        "Resume analysis failed"

    });

  } finally {

    // ------------------------------------
    // Delete uploaded PDF
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