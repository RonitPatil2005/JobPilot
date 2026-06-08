import { useState } from "react";
import {
  FaSearch,
  FaClock,
  FaChartLine
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";

import "./Home.css";

import heroBg from "../assets/hero-bg.png";

function Home() {
  const [jobs, setJobs] = useState([]);

  return (
    <>
      <Navbar />

      <section
        className="hero"
        style={{
          backgroundImage: `url(${heroBg})`
        }}
      >
        <div className="overlay">

          <h1>
            Find Jobs From Multiple Sources
            In One Place
          </h1>

          <h3>
            One Search. Multiple Sources.
            Endless Opportunities.
          </h3>

          <p>
            JOBPILOT aggregates job listings
            from multiple career websites
            using JSearch API.
          </p>

          <SearchBar setJobs={setJobs} />

        </div>
      </section>

      {/* JOB RESULTS */}

      {jobs.length > 0 && (
        <section className="jobs-section">

          <div className="jobs-container">

            <h2>Search Results</h2>

            <div className="jobs-grid">

              {jobs.map((job, index) => (

                <div
                  key={index}
                  className="job-card"
                >

                  <h3>
                    {job.job_title}
                  </h3>

                  <p>
                    <strong>Company:</strong>
                    {" "}
                    {job.employer_name}
                  </p>

                  <p>
                    <strong>Location:</strong>
                    {" "}
                    {job.job_city ||
                      "Not Specified"}
                  </p>

                  <p>
                    <strong>Source:</strong>
                    {" "}
                    {job.job_publisher}
                  </p>

                  <a
                    href={job.job_apply_link}
                    target="_blank"
                    rel="noreferrer"
                    className="apply-btn"
                  >
                    Apply Now
                  </a>

                </div>

              ))}

            </div>

          </div>

        </section>
      )}

      {/* WHY JOBPILOT */}

      <section className="why-jobpilot">

        <h2>Why JOBPILOT?</h2>

        <div className="features-grid">

          <div className="feature-card">
            <FaSearch className="feature-icon" />
            <h3>Multiple Sources</h3>
            <p>
              Get jobs from various career websites in one place.
            </p>
          </div>

          <div className="feature-card">
            <FaSearch className="feature-icon" />
            <h3>Smart Search</h3>
            <p>
              Search once and find relevant opportunities.
            </p>
          </div>

          <div className="feature-card">
            <FaClock className="feature-icon" />
            <h3>Save Time</h3>
            <p>
              No need to visit multiple websites repeatedly.
            </p>
          </div>

          <div className="feature-card">
            <FaChartLine className="feature-icon" />
            <h3>Better Opportunities</h3>
            <p>
              More listings and more career options.
            </p>
          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Home;