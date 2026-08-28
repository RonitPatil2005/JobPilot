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

  // ------------------------------------
  // JOB SEARCH STATES
  // ------------------------------------

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(false);


  // ------------------------------------
  // RESUME ANALYSIS STATES
  // ------------------------------------

  const [resumeFile, setResumeFile] = useState(null);

  const [skills, setSkills] = useState([]);

  const [suggestedRole, setSuggestedRole] =
    useState("");

  const [resumeLoading, setResumeLoading] =
    useState(false);

  const [resumeError, setResumeError] =
    useState("");


  // ------------------------------------
  // SUGGESTED ROLE SEARCH STATE
  // ------------------------------------

  const [roleLoading, setRoleLoading] =
    useState(false);


  // ------------------------------------
  // SEARCH JOBS
  // ------------------------------------

  const handleSearch = async () => {

    const token =
      localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      return;
    }

    if (!keyword.trim()) {
      alert("Please enter a job title or skill.");
      return;
    }

    try {

      console.log(
        "Searching jobs:",
        keyword,
        location
      );

      setLoading(true);

      const data =
        await searchJobs(
          keyword,
          location
        );

      console.log(
        "Jobs received:",
        data
      );

      setJobs(
        Array.isArray(data)
          ? data
          : []
      );

      setTimeout(() => {

        document
          .querySelector(".jobs-section")
          ?.scrollIntoView({
            behavior: "smooth"
          });

      }, 300);

    } catch (error) {

      console.error(
        "Job Search Error:",
        error
      );

      alert(
        "Unable to fetch jobs."
      );

    } finally {

      setLoading(false);

    }
  };


  // ------------------------------------
  // RESUME FILE SELECT
  // ------------------------------------

  const handleResumeChange = (e) => {

    const selectedFile =
      e.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    console.log(
      "Resume selected:",
      selectedFile
    );

    // Check PDF
    if (
      selectedFile.type !==
      "application/pdf"
    ) {

      alert(
        "Please upload a PDF resume."
      );

      e.target.value = "";
      setResumeFile(null);

      return;
    }

    setResumeFile(
      selectedFile
    );

    // Clear previous results
    setSkills([]);
    setSuggestedRole("");
    setResumeError("");

  };


  // ------------------------------------
  // RESUME ANALYSIS
  // ------------------------------------

  const handleResumeUpload =
    async () => {

      if (!resumeFile) {

        alert(
          "Please upload PDF Resume."
        );

        return;
      }

      try {

        console.log(
          "Starting resume analysis..."
        );

        console.log(
          "File:",
          resumeFile.name
        );

        setResumeLoading(true);
        setResumeError("");

        const data =
          await uploadResume(
            resumeFile
          );

        console.log(
          "Resume analysis response:",
          data
        );


        // --------------------------------
        // CHECK BACKEND RESPONSE
        // --------------------------------

        if (!data) {

          throw new Error(
            "Empty response from server"
          );

        }


        // --------------------------------
        // HANDLE API ERROR RESPONSE
        // --------------------------------

        if (
          data.message &&
          !data.skills &&
          !data.suggestedRole
        ) {

          throw new Error(
            data.message
          );

        }


        // --------------------------------
        // SET SKILLS
        // --------------------------------

        setSkills(
          Array.isArray(data.skills)
            ? data.skills
            : []
        );


        // --------------------------------
        // SET SUGGESTED ROLE
        // --------------------------------

        setSuggestedRole(
          data.suggestedRole || ""
        );


        // --------------------------------
        // CHECK ANALYSIS SOURCE
        // --------------------------------

        if (
          data.analysisSource ===
          "keyword-fallback"
        ) {

          console.warn(
            "Gemini unavailable. Keyword fallback used."
          );

        } else if (
          data.analysisSource ===
          "gemini"
        ) {

          console.log(
            "Gemini analysis successful."
          );

        }


        // --------------------------------
        // IF BOTH ARE EMPTY
        // --------------------------------

        if (
          (!data.skills ||
            data.skills.length === 0) &&
          !data.suggestedRole
        ) {

          setResumeError(
            "Unable to extract useful information from this resume."
          );

        }

      } catch (error) {

        console.error(
          "Resume analysis error:",
          error
        );

        console.error(
          "Server response:",
          error.response?.data
        );


        setSkills([]);
        setSuggestedRole("");


        setResumeError(
          "Resume analysis failed. Please try again."
        );

      } finally {

        setResumeLoading(false);

      }

    };


  // ------------------------------------
  // SEARCH USING SUGGESTED ROLE
  // ------------------------------------

  const searchSuggestedRole =
    async () => {

      if (!suggestedRole) {
        return;
      }

      const token =
        localStorage.getItem("token");

      if (!token) {

        alert(
          "Please login first."
        );

        return;
      }

      try {

        console.log(
          "Searching suggested role:",
          suggestedRole
        );

        setRoleLoading(true);

        setKeyword(
          suggestedRole
        );


        const data =
          await searchJobs(
            suggestedRole,
            location
          );


        console.log(
          "Suggested role jobs:",
          data
        );


        setJobs(
          Array.isArray(data)
            ? data
            : []
        );


        setTimeout(() => {

          document
            .querySelector(".jobs-section")
            ?.scrollIntoView({
              behavior: "smooth"
            });

        }, 300);

      } catch (error) {

        console.error(
          "Suggested Role Search Error:",
          error
        );

        alert(
          "Unable to fetch jobs."
        );

      } finally {

        setRoleLoading(false);

      }

    };


  // ------------------------------------
  // RENDER
  // ------------------------------------

  return (
    <>
      <Navbar />


      <div className="jobs-page">


        {/* ==================================
            HERO / JOB SEARCH
        ================================== */}

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


            {/* JOB KEYWORD */}

            <div className="search-field">

              <FaSearch />

              <input
                id="job-keyword"
                name="jobKeyword"
                type="text"
                placeholder="Job Title, Skills..."
                value={keyword}
                autoComplete="off"
                onChange={(e) =>
                  setKeyword(
                    e.target.value
                  )
                }
                onKeyDown={(e) => {

                  if (
                    e.key === "Enter"
                  ) {

                    handleSearch();

                  }

                }}
              />

            </div>


            {/* LOCATION */}

            <div className="search-field">

              <FaMapMarkerAlt />

              <input
                id="job-location"
                name="jobLocation"
                type="text"
                placeholder="Location"
                value={location}
                autoComplete="off"
                onChange={(e) =>
                  setLocation(
                    e.target.value
                  )
                }
                onKeyDown={(e) => {

                  if (
                    e.key === "Enter"
                  ) {

                    handleSearch();

                  }

                }}
              />

            </div>


            {/* SEARCH BUTTON */}

            <button
              type="button"
              onClick={
                handleSearch
              }
              disabled={
                loading
              }
            >

              {loading
                ? "Searching..."
                : "Search Jobs"}

            </button>

          </div>

        </div>



        {/* ==================================
            RESUME ANALYZER
        ================================== */}

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


            {/* RESUME INPUT */}

            <input
              id="resume-file"
              name="resume"
              type="file"
              accept=".pdf,application/pdf"
              onChange={
                handleResumeChange
              }
            />


            {/* ANALYZE BUTTON */}

            <button
              type="button"
              onClick={
                handleResumeUpload
              }
              disabled={
                resumeLoading
              }
            >

              {resumeLoading
                ? "Analyzing..."
                : "Analyze Resume"}

            </button>

          </div>


          {/* SELECTED FILE */}

          {resumeFile && (

            <p className="selected-file">

              Selected:
              {" "}
              {resumeFile.name}

            </p>

          )}


          {/* RESUME ERROR */}

          {resumeError && (

            <p className="resume-error">

              {resumeError}

            </p>

          )}



          {/* ==================================
              RESUME RESULT
          ================================== */}

          {(skills.length > 0 ||
            suggestedRole) && (

            <div className="resume-result">


              {/* SKILLS */}

              {skills.length > 0 && (

                <>
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
                          key={`${skill}-${index}`}
                        >
                          {skill}
                        </span>

                      )
                    )}

                  </div>

                </>

              )}



              {/* SUGGESTED ROLE */}

              {suggestedRole && (

                <>

                  <h3>
                    Suggested Role
                  </h3>

                  <p className="role-text">
                    {suggestedRole}
                  </p>


                  {/* SEARCH ROLE BUTTON */}

                  <button
                    type="button"
                    className="suggested-btn"
                    onClick={
                      searchSuggestedRole
                    }
                    disabled={
                      roleLoading
                    }
                  >

                    {roleLoading
                      ? "Searching..."
                      : "Search Jobs For This Role"}

                  </button>

                </>

              )}

            </div>

          )}

        </div>



        {/* ==================================
            JOB RESULTS
        ================================== */}

        <div className="jobs-section">

          <h2>

            {jobs.length}
            {" "}
            Jobs Found

          </h2>


          {jobs.length === 0 && (

            <p className="no-jobs">

              Search for a job to see
              available opportunities.

            </p>

          )}


          <div className="jobs-grid">

            {jobs.map(
              (
                job,
                index
              ) => (

                <div
                  className="job-card"
                  key={
                    job.job_id ||
                    index
                  }
                >


                  {/* JOB TITLE */}

                  <h3>
                    {
                      job.job_title ||
                      "Job Title N/A"
                    }
                  </h3>


                  {/* COMPANY */}

                  <h4>
                    {
                      job.employer_name ||
                      "Company N/A"
                    }
                  </h4>


                  {/* LOCATION */}

                  <p>
                    📍{" "}

                    {
                      job.job_city ||
                      job.job_state ||
                      job.job_country ||
                      "Location N/A"
                    }

                  </p>


                  {/* POSTED DATE */}

                  <p>

                    📅 Posted:{" "}

                    {
                      job.job_posted_at_datetime
                        ? new Date(
                            job.job_posted_at_datetime
                          ).toLocaleDateString()
                        : job.job_posted_at_timestamp
                        ? new Date(
                            Number(
                              job.job_posted_at_timestamp
                            ) * 1000
                          ).toLocaleDateString()
                        : "Date N/A"
                    }

                  </p>


                  {/* SOURCE */}

                  <p>

                    Source:
                    {" "}

                    {
                      job.job_publisher ||
                      "N/A"
                    }

                  </p>


                  {/* EMPLOYMENT */}

                  <p>

                    Employment:
                    {" "}

                    {
                      job.job_employment_type ||
                      "N/A"
                    }

                  </p>


                  {/* APPLY */}

                  {job.job_apply_link && (

                    <a
                      href={
                        job.job_apply_link
                      }
                      target="_blank"
                      rel="noreferrer"
                    >

                      <button
                        type="button"
                      >
                        Apply Now
                      </button>

                    </a>

                  )}

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