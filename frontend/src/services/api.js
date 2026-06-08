import axios from "axios";

const API = axios.create({
  baseURL: "https://jobpilot-backend-wgv0.onrender.com/api"
});

export default API;