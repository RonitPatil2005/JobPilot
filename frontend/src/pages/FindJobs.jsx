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

  const [resumeFile, setResumeFile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [suggestedRole, setSuggestedRole] = useState("");

  const [resumeLoading, setResumeLoading] = useState(false);

  const [roleLoading, setRoleLoading] = useState(false);

  // SEARCH JOBS

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
        document.querySelector(".jobs-section")?.scrollIntoView({behavior: "smooth"});
      }, 300);

    } catch (error) {
      alert(
        "Unable to fetch jobs"
      );

    } finally {
        setLoading(false);
      }
  };

  // RESUME ANALYSIS

  const handleResumeUpload =
    async () => {

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

        setSkills(
          data.skills || []
        );

        setSuggestedRole(
          data.suggestedRole || ""
        );

      } catch (error) {
        alert(
          "Resume analysis failed"
        );

      } finally {

        setResumeLoading(false);

      }
    };

  // SEARCH JOBS USING SUGGESTED ROLE

  const searchSuggestedRole =
    async () => {

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
                type="text"
                placeholder="Job Title, Skills..."
                value={keyword}
                onChange={(e) =>
                  setKeyword(
                    e.target.value
                  )
                }
              />

            </div>

            <div className="search-field">

              <FaMapMarkerAlt />

              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) =>
                  setLocation(
                    e.target.value
                  )
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

          {skills.length > 0 && (

            <div className="resume-result">

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

              <h3>
                Suggested Role
              </h3>

              <p className="role-text">
                {suggestedRole}
              </p>

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