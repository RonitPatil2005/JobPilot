import axios from "axios";

const API =
  "http://localhost:5000/api/auth";

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