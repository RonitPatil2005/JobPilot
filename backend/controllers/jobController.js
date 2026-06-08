const {
  searchJobs,
} = require("../services/jsearchService");

/* Search Jobs */

const getJobs = async (
  req,
  res
) => {
  try {
    const {
      keyword,
      location,
    } = req.query;

    if (!keyword) {
      return res.status(400).json({
        message:
          "Job title is required",
      });
    }

    const jobs =
      await searchJobs(
        keyword,
        location
      );

    res.status(200).json(jobs);
  } catch (error) {
    console.error("Job Search Error:");
    console.error(error.response?.data || error.message);

    res.status(500).json({
      message: error.message,
    });
  }

};

module.exports = {
  getJobs,
};