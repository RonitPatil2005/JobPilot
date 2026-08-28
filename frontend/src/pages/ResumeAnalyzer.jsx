import {
  useState
} from "react";

import {
  uploadResume
} from "../services/resumeService";

function ResumeAnalyzer() {

  const [file, setFile] =
    useState(null);

  const [skills, setSkills] =
    useState([]);

  const [suggestedRole, setSuggestedRole] =
    useState("");

  const [alternativeRoles, setAlternativeRoles] =
    useState([]);

  const [atsScore, setAtsScore] =
    useState(null);

  const [strengths, setStrengths] =
    useState([]);

  const [weaknesses, setWeaknesses] =
    useState([]);

  const [suggestions, setSuggestions] =
    useState([]);

  const [aiMessage, setAiMessage] =
    useState("");

  const [analysisSource, setAnalysisSource] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  // ------------------------------------
  // Analyze Resume
  // ------------------------------------

  const handleUpload =
    async () => {

      if (!file) {

        setError(
          "Please select a PDF resume first."
        );

        return;
      }


      try {

        setLoading(true);
        setError("");
        setAiMessage("");


        // Clear previous results

        setSkills([]);
        setSuggestedRole("");
        setAlternativeRoles([]);
        setAtsScore(null);
        setStrengths([]);
        setWeaknesses([]);
        setSuggestions([]);
        setAnalysisSource("");


        console.log(
          "Uploading resume..."
        );


        const data =
          await uploadResume(file);


        console.log(
          "Resume analysis response:",
          data
        );


        // ------------------------------------
        // Basic results
        // ------------------------------------

        setSkills(
          data.skills || []
        );

        setSuggestedRole(
          data.suggestedRole || ""
        );


        // ------------------------------------
        // Gemini results
        // ------------------------------------

        setAlternativeRoles(
          data.alternativeRoles || []
        );

        setAtsScore(
          data.atsScore ?? null
        );

        setStrengths(
          data.strengths || []
        );

        setWeaknesses(
          data.weaknesses || []
        );

        setSuggestions(
          data.suggestions || []
        );


        // ------------------------------------
        // Analysis source
        // ------------------------------------

        setAnalysisSource(
          data.analysisSource || ""
        );


        // ------------------------------------
        // Gemini failure message
        // ------------------------------------

        if (
          data.analysisSource ===
          "keyword-fallback"
        ) {

          setAiMessage(
            data.aiMessage ||
            "AI analysis is temporarily unavailable due to a technical error."
          );

        }


      } catch (err) {

        console.error(
          "Resume Analysis Error:",
          err
        );


        setError(
          "Unable to analyze resume. Please try again."
        );

      } finally {

        setLoading(false);

      }
    };


  return (

    <div
      style={{
        padding: "40px"
      }}
    >

      <h2>
        Resume Analyzer
      </h2>


      {/* ------------------------------------
          File Upload
      ------------------------------------ */}

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => {

          setFile(
            e.target.files[0] || null
          );

          setError("");
          setAiMessage("");

        }}
      />


      <br />
      <br />


      <button
        onClick={
          handleUpload
        }
        disabled={loading}
      >

        {loading
          ? "Analyzing..."
          : "Analyze Resume"}

      </button>


      {/* ------------------------------------
          Error
      ------------------------------------ */}

      {error && (

        <p>
          {error}
        </p>

      )}


      {/* ------------------------------------
          AI Technical Message
      ------------------------------------ */}

      {aiMessage && (

        <p>
          {aiMessage}
        </p>

      )}


      {/* ------------------------------------
          Analysis Source
      ------------------------------------ */}

      {analysisSource === "gemini" && (

        <p>
          AI-powered resume analysis completed.
        </p>

      )}


      {/* ------------------------------------
          Skills
      ------------------------------------ */}

      {skills.length > 0 && (

        <>

          <h3>
            Skills Found
          </h3>

          <ul>

            {skills.map(
              (skill, index) => (

                <li
                  key={index}
                >
                  {skill}
                </li>

              )
            )}

          </ul>

        </>

      )}


      {/* ------------------------------------
          Suggested Role
      ------------------------------------ */}

      {suggestedRole && (

        <>

          <h3>
            Suggested Role
          </h3>

          <h2>
            {suggestedRole}
          </h2>

        </>

      )}


      {/* ------------------------------------
          Alternative Roles
      ------------------------------------ */}

      {alternativeRoles.length > 0 && (

        <>

          <h3>
            Alternative Roles
          </h3>

          <ul>

            {alternativeRoles.map(
              (role, index) => (

                <li
                  key={index}
                >
                  {role}
                </li>

              )
            )}

          </ul>

        </>

      )}


      {/* ------------------------------------
          ATS Score
      ------------------------------------ */}

      {atsScore !== null && (

        <>

          <h3>
            ATS Score
          </h3>

          <h2>
            {atsScore}/100
          </h2>

        </>

      )}


      {/* ------------------------------------
          Strengths
      ------------------------------------ */}

      {strengths.length > 0 && (

        <>

          <h3>
            Resume Strengths
          </h3>

          <ul>

            {strengths.map(
              (strength, index) => (

                <li
                  key={index}
                >
                  {strength}
                </li>

              )
            )}

          </ul>

        </>

      )}


      {/* ------------------------------------
          Weaknesses
      ------------------------------------ */}

      {weaknesses.length > 0 && (

        <>

          <h3>
            Areas to Improve
          </h3>

          <ul>

            {weaknesses.map(
              (weakness, index) => (

                <li
                  key={index}
                >
                  {weakness}
                </li>

              )
            )}

          </ul>

        </>

      )}


      {/* ------------------------------------
          Suggestions
      ------------------------------------ */}

      {suggestions.length > 0 && (

        <>

          <h3>
            Resume Improvement Suggestions
          </h3>

          <ul>

            {suggestions.map(
              (suggestion, index) => (

                <li
                  key={index}
                >
                  {suggestion}
                </li>

              )
            )}

          </ul>

        </>

      )}

    </div>

  );
}

export default ResumeAnalyzer;
