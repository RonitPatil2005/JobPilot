import axios from "axios";

const API =
  "https://jobpilot-backend-wgv0.onrender.com/api/auth";

export const registerUser =
  (userData) =>
    axios.post(
      `${API}/register`,
      userData
    );

export const loginUser =
  (userData) =>
    axios.post(
      `${API}/login`,
      userData
    );