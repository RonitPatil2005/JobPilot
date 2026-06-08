import axios from "axios";

const API_URL =
  "http://localhost:5000/api/jobs";

export const searchJobs = async (
  keyword,
  location
) => {
  const token =
    localStorage.getItem("token");

  const response =
    await axios.get(
      `${API_URL}/search`,
      {
        params: {
          keyword,
          location,
        },
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  return response.data;
};