const axios = require("axios");

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
            query: `${keyword} in ${location}`,
            page: "1",
            num_pages: "1",
          },

          headers: {
            "X-RapidAPI-Key":
              process.env.JSEARCH_API_KEY,

            "X-RapidAPI-Host":
              "jsearch.p.rapidapi.com",
          },
        }
      );

    return response.data.data;
  } catch (error) {
    console.log(error.response?.status);
    console.log(error.response?.data);
    throw error;
  }
};
console.log("API KEY:", process.env.JSEARCH_API_KEY);
module.exports = {
  searchJobs,
};