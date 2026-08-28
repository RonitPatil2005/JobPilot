import axios from "axios";

const API_URL =
  import.meta.env.BACKEND_API_URL ||
  "https://jobpilot-backend-wgv0.onrender.com";

export const uploadResume = async (file) => {
  console.log("Resume Service: Sending PDF...");
  console.log("API URL:", API_URL);

  const formData = new FormData();

  formData.append("resume", file);

  const response = await axios.post(
    `${API_URL}/api/resume/analyze`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  console.log(
    "Resume Service Response:",
    response.data
  );

  return response.data;
};