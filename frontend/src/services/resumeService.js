import axios from "axios";

const API =
  "http://localhost:5000/api/resume";

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