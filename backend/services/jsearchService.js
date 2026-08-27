const axios = require("axios");

// Maximum age of a job in days
// Default = 15 days
const MAX_JOB_AGE_DAYS =
  Number(process.env.MAX_JOB_AGE_DAYS) || 15;

// Number of JSearch pages to fetch
// 1 page ≈ 10 jobs
const NUM_PAGES = 3;


// ------------------------------------
// Get job posting date
// ------------------------------------

const getJobDate = (job) => {

  // JSearch timestamp
  if (job.job_posted_at_timestamp) {

    const timestamp =
      Number(job.job_posted_at_timestamp);

    if (!isNaN(timestamp)) {

      return new Date(timestamp * 1000);

    }
  }


  // JSearch datetime fallback
  if (job.job_posted_at_datetime) {

    const date =
      new Date(job.job_posted_at_datetime);

    if (!isNaN(date.getTime())) {

      return date;

    }
  }


  return null;
};


// ------------------------------------
// Search Jobs
// ------------------------------------

const searchJobs = async (
  keyword,
  location
) => {

  try {

    const response =
      await axios.get(
        "https://jsearch.p.rapidapi.com/search",
        {

          params: {

            query:
              `${keyword} in ${location}`,

            page: "1",

            num_pages:
              String(NUM_PAGES),

            // Ask JSearch for a recent pool
            date_posted: "month"

          },

          headers: {

            "X-RapidAPI-Key":
              process.env.JSEARCH_API_KEY,

            "X-RapidAPI-Host":
              "jsearch.p.rapidapi.com"

          }

        }
      );


    // ------------------------------------
    // Get all jobs
    // ------------------------------------

    const jobs =
      response.data.data || [];


    console.log(
      `JSearch returned ${jobs.length} jobs`
    );


    // ------------------------------------
    // Calculate cutoff date
    // ------------------------------------

    const now =
      new Date();

    const cutoffDate =
      new Date(
        now.getTime() -
        MAX_JOB_AGE_DAYS *
        24 *
        60 *
        60 *
        1000
      );


    // ------------------------------------
    // Filter recent jobs
    // ------------------------------------

    const recentJobs =
      jobs.filter((job) => {

        const jobDate =
          getJobDate(job);


        // If posting date is missing,
        // don't assume it is recent
        if (!jobDate) {

          return false;

        }


        return jobDate >= cutoffDate;

      });


    // ------------------------------------
    // Sort newest jobs first
    // ------------------------------------

    recentJobs.sort((a, b) => {

      const dateA =
        getJobDate(a);

      const dateB =
        getJobDate(b);

      return dateB - dateA;

    });


    console.log(
      `${recentJobs.length} jobs are within ${MAX_JOB_AGE_DAYS} days`
    );


    return recentJobs;


  } catch (error) {

    console.log(
      "JSearch Error Status:",
      error.response?.status
    );

    console.log(
      "JSearch Error Data:",
      error.response?.data
    );

    throw error;

  }

};


module.exports = {
  searchJobs
};