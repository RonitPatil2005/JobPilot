import axios from "axios";

export const uploadResume = async (file) => {

  const formData = new FormData();

  formData.append(
    "resume",
    file
  );

  console.log(
    "Resume Service: Sending PDF..."
  );

  const response =
    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/resume/analyze`,
      formData
    );

  console.log(
    "Resume Service Response:",
    response.data
  );

  return response.data;
};