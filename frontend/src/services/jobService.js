import axios from "axios";

const API = "https://jobpilot-backend-wgv0.onrender.com/api/jobs";

export const searchJobs =
  async (
    keyword,
    location
  ) => {

    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await axios.get(
        `${API}/search`,
        {
          params: {
            keyword,
            location
          },

          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    return response.data;
  };