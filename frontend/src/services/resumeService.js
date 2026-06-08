import axios from "axios";

const API = "https://jobpilot-backend-wgv0.onrender.com/api/jobs";

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
        `${API}/analyze`,
        formData
      );

    return response.data;
  };