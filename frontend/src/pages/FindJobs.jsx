import { useState } from "react";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaFilePdf
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { searchJobs } from "../services/jobService";
import { uploadResume } from "../services/resumeService";
import "./FindJobs.css";

function FindJobs() {

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(false);

  // Resume states
  const [resumeFile, setResumeFile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [suggestedRole, setSuggestedRole] = useState("");
  const [alternativeRoles, setAlternativeRoles] = useState([]);

  const [atsScore, setAtsScore] = useState(null);
  const [strengths, setStrengths] = useState([]);
  const [weaknesses, setWeaknesses] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const [analysisSource, setAnalysisSource] = useState("");

  const [resumeLoading, setResumeLoading] = useState(false);
  const [roleLoading, setRoleLoading] = useState(false);


  // ------------------------------------
  // SEARCH JOBS
  // ------------------------------------

  const handleSearch = async () => {

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      return;
    }

    try {

      setLoading(true);

      const data = await searchJobs(
        keyword,
        location
      );

      setJobs(data);

      setTimeout(() => {

        document
          .querySelector(".jobs-section")
          ?.scrollIntoView({
            behavior: "smooth"
          });

      }, 300);

    } catch (error) {

      console.error(error);

      alert(
        "Unable to fetch jobs"
      );

    } finally {

      setLoading(false);

    }
  };


  // ------------------------------------
  // RESUME ANALYSIS
  // ------------------------------------

  const handleResumeUpload = async () => {

    if (!resumeFile) {

      alert(
        "Please upload PDF Resume"
      );

      return;
    }

    try {

      setResumeLoading(true);

      const data = await uploadResume(
        resumeFile
      );

      console.log(
        "Resume Analysis Result:",
        data
      );


      // --------------------------------
      // Basic results
      // --------------------------------

      setSkills(
        data.skills || []
      );

      setSuggestedRole(
        data.suggestedRole || ""
      );


      // --------------------------------
      // Gemini detailed results
      // --------------------------------

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

      setAnalysisSource(
        data.analysisSource || ""
      );


    } catch (error) {

      console.error(
        "Resume Analysis Error:",
        error
      );

      alert(
        "Resume analysis failed"
      );

    } finally {

      setResumeLoading(false);

    }
  };


  // ------------------------------------
  // SEARCH JOBS USING SUGGESTED ROLE
  // ------------------------------------

  const searchSuggestedRole = async () => {

    if (!suggestedRole) return;

    try {

      setRoleLoading(true);

      setKeyword(
        suggestedRole
      );

      const data =
        await searchJobs(
          suggestedRole,
          location
        );

      setJobs(data);

      setTimeout(() => {

        document
          .querySelector(
            ".jobs-section"
          )
          ?.scrollIntoView({
            behavior: "smooth"
          });

      }, 300);

    } catch (error) {

      console.log(error);

      alert(
        "Unable to fetch jobs"
      );

    } finally {

      setRoleLoading(false);

    }
  };


  return (
    <>
      <Navbar />

      <div className="jobs-page">

        {/* HERO */}

        <div className="jobs-hero">

          <h1>
            Find Your Next Opportunity
          </h1>

          <p>
            Search jobs collected
            from multiple career
            websites in one place.
          </p>


          <div className="jobs-search">

            <div className="search-field">

              <FaSearch />

              <input
                id="job-keyword"
                name="job-keyword"
                type="text"
                placeholder="Job Title, Skills..."
                value={keyword}
                onChange={(e) =>
                  setKeyword(e.target.value)
                }
              />

            </div>


            <div className="search-field">

              <FaMapMarkerAlt />

              <input
                id="job-location"
                name="job-location"
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
              />

            </div>


            <button
              onClick={
                handleSearch
              }
            >
              {
                loading
                  ? "Searching..."
                  : "Search Jobs"
              }
            </button>

          </div>

        </div>


        {/* RESUME ANALYZER */}

        <div className="resume-section">

          <h2>
            Resume Based Job Suggestions
          </h2>

          <p>
            Upload your PDF resume
            and discover suitable
            job roles instantly.
          </p>


          <div className="resume-upload">

            <FaFilePdf />

            <input
              id="resume-file"
              name="resume"
              type="file"
              accept=".pdf"
              onChange={(e) =>
                setResumeFile(
                  e.target.files[0]
                )
              }
            />


            <button
              onClick={
                handleResumeUpload
              }
            >
              {
                resumeLoading
                  ? "Analyzing..."
                  : "Analyze Resume"
              }
            </button>

          </div>


          {/* --------------------------------
              RESUME RESULTS
          -------------------------------- */}

          {skills.length > 0 && (

            <div className="resume-result">


              {/* SKILLS */}

              <h3>
                Skills Found
              </h3>

              <div className="skills-list">

                {skills.map(
                  (
                    skill,
                    index
                  ) => (

                    <span
                      key={index}
                    >
                      {skill}
                    </span>

                  )
                )}

              </div>


              {/* SUGGESTED ROLE */}

              <h3>
                Suggested Role
              </h3>

              <p className="role-text">
                {suggestedRole}
              </p>


              {/* ALTERNATIVE ROLES */}

              {alternativeRoles.length > 0 && (

                <>

                  <h3>
                    Alternative Roles
                  </h3>

                  <div className="skills-list">

                    {alternativeRoles.map(
                      (
                        role,
                        index
                      ) => (

                        <span
                          key={index}
                        >
                          {role}
                        </span>

                      )
                    )}

                  </div>

                </>

              )}


              {/* ATS SCORE */}

              {atsScore !== null && (

                <>

                  <h3>
                    ATS Score
                  </h3>

                  <p className="role-text">
                    {atsScore}/100
                  </p>

                </>

              )}


              {/* STRENGTHS */}

              {strengths.length > 0 && (

                <>

                  <h3>
                    Strengths
                  </h3>

                  <ul>

                    {strengths.map(
                      (
                        strength,
                        index
                      ) => (

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


              {/* WEAKNESSES */}

              {weaknesses.length > 0 && (

                <>

                  <h3>
                    Areas to Improve
                  </h3>

                  <ul>

                    {weaknesses.map(
                      (
                        weakness,
                        index
                      ) => (

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


              {/* SUGGESTIONS */}

              {suggestions.length > 0 && (

                <>

                  <h3>
                    Resume Improvement Suggestions
                  </h3>

                  <ul>

                    {suggestions.map(
                      (
                        suggestion,
                        index
                      ) => (

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


              {/* ANALYSIS SOURCE */}

              {analysisSource ===
                "keyword-fallback" && (

                  <p>
                    AI analysis is temporarily
                    unavailable due to a
                    technical error.
                  </p>

                )}


              {/* SEARCH SUGGESTED ROLE */}

              <button
                className="suggested-btn"
                onClick={
                  searchSuggestedRole
                }
                disabled={
                  roleLoading
                }
              >
                {
                  roleLoading
                    ? "Searching..."
                    : "Search Jobs For This Role"
                }
              </button>


            </div>

          )}

        </div>


        {/* JOB RESULTS */}

        <div className="jobs-section">

          <h2>
            {jobs.length} Jobs Found
          </h2>


          <div className="jobs-grid">

            {jobs.map(
              (
                job,
                index
              ) => (

                <div
                  className="job-card"
                  key={index}
                >

                  <h3>
                    {job.job_title}
                  </h3>

                  <h4>
                    {
                      job.employer_name
                    }
                  </h4>

                  <p>
                    📍{" "}
                    {
                      job.job_city ||
                      job.job_country ||
                      "Location N/A"
                    }
                  </p>

                  <p>
                    Source:{" "}
                    {
                      job.job_publisher
                    }
                  </p>

                  <p>
                    Employment:{" "}
                    {
                      job.job_employment_type ||
                      "N/A"
                    }
                  </p>

                  <a
                    href={
                      job.job_apply_link
                    }
                    target="_blank"
                    rel="noreferrer"
                  >

                    <button>
                      Apply Now
                    </button>

                  </a>

                </div>

              )
            )}

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default FindJobs;