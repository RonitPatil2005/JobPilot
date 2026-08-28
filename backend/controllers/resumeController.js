const fs = require("fs");
const pdfParse = require("pdf-parse");
const { GoogleGenAI } = require("@google/genai");

// ------------------------------------
// GEMINI CONFIGURATION
// ------------------------------------

const GEMINI_API_KEY =
  process.env.GEMINI_API_KEY;

// Model is kept here.
// No GEMINI_MODEL is required in .env.
const GEMINI_MODEL =
  "gemini-2.5-flash";

console.log(
  "Gemini API Key:",
  GEMINI_API_KEY
    ? "Configured"
    : "Missing"
);

console.log(
  "Gemini Model:",
  GEMINI_MODEL
);

const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
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


  // ------------------------------------
  // Suggested Role
  // ------------------------------------

  let suggestedRole =
    "Software Developer";


  // MERN has highest priority
  if (
    skills.includes("react") &&
    skills.includes("node") &&
    skills.includes("express") &&
    skills.includes("mongodb")
  ) {

    suggestedRole =
      "MERN Stack Developer";

  }

  // Frontend
  else if (
    skills.includes("react") &&
    skills.includes("javascript")
  ) {

    suggestedRole =
      "Frontend Developer";

  }

  // Node Backend
  else if (
    skills.includes("node") &&
    skills.includes("express")
  ) {

    suggestedRole =
      "Backend Developer";

  }

  // Java
  else if (
    skills.includes("java")
  ) {

    suggestedRole =
      "Java Developer";

  }

  // Python
  else if (
    skills.includes("python")
  ) {

    suggestedRole =
      "Python Developer";

  }

  // PHP
  else if (
    skills.includes("php")
  ) {

    suggestedRole =
      "PHP Developer";

  }


  // ------------------------------------
  // Alternative Roles
  // ------------------------------------

  const alternativeRoles = [];


  if (
    skills.includes("react") &&
    skills.includes("javascript") &&
    suggestedRole !==
      "Frontend Developer"
  ) {

    alternativeRoles.push(
      "Frontend Developer"
    );

  }


  if (
    skills.includes("node") &&
    skills.includes("express") &&
    suggestedRole !==
      "Backend Developer"
  ) {

    alternativeRoles.push(
      "Backend Developer"
    );

  }


  if (
    skills.includes("javascript")
  ) {

    alternativeRoles.push(
      "JavaScript Developer"
    );

  }


  if (
    skills.includes("python") &&
    suggestedRole !==
      "Python Developer"
  ) {

    alternativeRoles.push(
      "Python Developer"
    );

  }


  if (
    skills.includes("java") &&
    suggestedRole !==
      "Java Developer"
  ) {

    alternativeRoles.push(
      "Java Developer"
    );

  }


  return {

    skills,

    suggestedRole,

    alternativeRoles:
      alternativeRoles.slice(0, 4),

    atsScore: null,

    strengths: [
      "Technical skills identified from resume"
    ],

    weaknesses: [],

    suggestions: [
      "AI analysis is temporarily unavailable due to a technical error. Basic resume analysis is being used."
    ]

  };

}


// ------------------------------------
// Gemini Resume Analysis
// ------------------------------------

async function analyzeWithGemini(
  resumeText
) {

  // ------------------------------------
  // Check API Key
  // ------------------------------------

  if (!GEMINI_API_KEY) {

    throw new Error(
      "GEMINI_API_KEY is not configured"
    );

  }


  console.log(
    "------------------------------------"
  );

  console.log(
    "Trying Gemini Resume Analysis..."
  );

  console.log(
    "Gemini Model:",
    GEMINI_MODEL
  );

  console.log(
    "Gemini API Key:",
    "Configured"
  );


  // ------------------------------------
  // Prompt
  // ------------------------------------

  const prompt = `

You are an expert technical recruiter and resume analyzer.

Analyze the following resume carefully.

Return ONLY valid JSON.

Do not use markdown.
Do not use code fences.
Do not include any explanation outside JSON.

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

1. skills

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

Only include skills actually present in the resume.

Do not invent skills.


2. suggestedRole

Select ONE most suitable technical job role.

Base the decision only on:

- Actual skills
- Projects
- Experience
- Education
- Technologies mentioned in the resume

Do not invent experience.


3. alternativeRoles

Give 2 to 4 other suitable technical job roles.

These must also be based only on the resume.


4. atsScore

Give an ATS-style score from 0 to 100.

Consider:

- Technical skills
- Projects
- Experience
- Education
- Keywords
- Resume structure

This is only an ATS-style estimate.


5. strengths

Give 3 to 5 important strengths based only on the resume.


6. weaknesses

Give 2 to 5 realistic areas that can be improved based only on the resume.


7. suggestions

Give 3 to 5 practical resume improvement suggestions.


IMPORTANT:

Do not invent skills.

Do not invent experience.

Do not assume technologies that are not mentioned.

Use only information present in the resume.


Resume:

${resumeText}

`;


  // ------------------------------------
  // Gemini Request
  // ------------------------------------

  try {

    const response =
      await ai.models.generateContent({

        model:
          GEMINI_MODEL,

        contents:
          prompt,

        config: {

          temperature: 0.2,

          responseMimeType:
            "application/json"

        }

      });


    console.log(
      "Gemini request completed."
    );


    // ------------------------------------
    // Response Text
    // ------------------------------------

    const resultText =
      response.text;


    if (!resultText) {

      throw new Error(
        "Gemini returned empty response"
      );

    }


    console.log(
      "Gemini response received."
    );


    // ------------------------------------
    // Parse JSON
    // ------------------------------------

    let result;

    try {

      result =
        JSON.parse(
          resultText
        );

    } catch (jsonError) {

      console.error(
        "Gemini returned invalid JSON."
      );

      console.error(
        "Gemini Response:",
        resultText
      );

      throw new Error(
        "Gemini returned invalid JSON"
      );

    }


    // ------------------------------------
    // Validate Result
    // ------------------------------------

    if (
      !Array.isArray(
        result.skills
      )
    ) {

      result.skills = [];

    }


    if (
      typeof result.suggestedRole !==
      "string"
    ) {

      result.suggestedRole = "";

    }


    if (
      !Array.isArray(
        result.alternativeRoles
      )
    ) {

      result.alternativeRoles = [];

    }


    if (
      !Array.isArray(
        result.strengths
      )
    ) {

      result.strengths = [];

    }


    if (
      !Array.isArray(
        result.weaknesses
      )
    ) {

      result.weaknesses = [];

    }


    if (
      !Array.isArray(
        result.suggestions
      )
    ) {

      result.suggestions = [];

    }


    if (
      typeof result.atsScore !==
      "number"
    ) {

      result.atsScore = null;

    }


    return result;

  } catch (error) {

    console.error(
      "Gemini API Error"
    );

    console.error(
      "Message:",
      error.message
    );

    console.error(
      "Status:",
      error.status ||
      error.statusCode ||
      error.response?.status ||
      "Unknown"
    );

    console.error(
      "Code:",
      error.code ||
      "Unknown"
    );


    if (
      error.response?.data
    ) {

      console.error(
        "Response Data:",
        error.response.data
      );

    }


    throw error;

  }

}


// ------------------------------------
// MAIN CONTROLLER
// ------------------------------------

exports.analyzeResume =
  async (req, res) => {

    let filePath = null;


    try {

      // --------------------------------
      // Check File
      // --------------------------------

      if (!req.file) {

        return res.status(400).json({

          message:
            "No PDF file uploaded"

        });

      }


      filePath =
        req.file.path;


      console.log(
        "Uploaded File:",
        req.file
      );


      // --------------------------------
      // Read PDF
      // --------------------------------

      const dataBuffer =
        fs.readFileSync(
          filePath
        );


      const pdfData =
        await pdfParse(
          dataBuffer
        );


      // --------------------------------
      // Check PDF Text
      // --------------------------------

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


      console.log(
        "Resume text extracted successfully."
      );

      console.log(
        "Resume text length:",
        resumeText.length
      );


      // --------------------------------
      // TRY GEMINI
      // --------------------------------

      try {

        const geminiResult =
          await analyzeWithGemini(
            resumeText
          );


        console.log(
          "Gemini analysis successful."
        );


        console.log(
          "Gemini Result:",
          JSON.stringify(
            geminiResult,
            null,
            2
          )
        );


        // --------------------------------
        // Return Gemini Result
        // --------------------------------

        return res.json({

          ...geminiResult,

          analysisSource:
            "gemini"

        });


      } catch (geminiError) {

        // --------------------------------
        // GEMINI FAILED
        // --------------------------------

        console.error(
          "Gemini Analysis Failed:"
        );

        console.error(
          geminiError.message
        );


        console.log(
          "Using keyword-based fallback..."
        );


        // --------------------------------
        // Keyword Analysis
        // --------------------------------

        const fallbackResult =
          analyzeWithKeywords(
            normalizedText
          );


        console.log(
          "Fallback Result:",
          JSON.stringify(
            fallbackResult,
            null,
            2
          )
        );


        // --------------------------------
        // Return Fallback
        // --------------------------------

        return res.json({

          ...fallbackResult,

          analysisSource:
            "keyword-fallback"

        });

      }

    } catch (err) {

      // --------------------------------
      // MAIN ERROR
      // --------------------------------

      console.error(
        "Resume Analysis Error:"
      );

      console.error(
        err
      );


      return res.status(500).json({

        message:
          "Resume analysis failed"

      });

    } finally {

      // --------------------------------
      // DELETE UPLOADED PDF
      // --------------------------------

      if (
        filePath &&
        fs.existsSync(
          filePath
        )
      ) {

        try {

          fs.unlinkSync(
            filePath
          );


          console.log(
            "Uploaded resume deleted."
          );

        } catch (deleteError) {

          console.error(
            "Unable to delete uploaded file:",
            deleteError.message
          );

        }

      }

    }

  };