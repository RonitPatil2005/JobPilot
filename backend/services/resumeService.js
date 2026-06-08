import axios from "axios";

const API_URL = "https://jobpilot-backend-wgv0.onrender.com/api/resume";

export const uploadResume =
  async (file) => {

    const formData =
      new FormData();

    formData.append(
      "resume",
      file
    );

    const response =
      await axios.post(
        `${API_URL}/analyze`,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data"
          }
        }
      );

    return response.data;
  };