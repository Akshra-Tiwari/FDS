import axios from "axios";

// Uses an environment variable when available (set REACT_APP_API_URL
// in a .env file, e.g. REACT_APP_API_URL=https://fds1-t172.onrender.com/api),
// falling back to the deployed backend URL so the app still works
// out of the box without extra setup.
const API = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL ||
    "https://fds1-t172.onrender.com/api"
});

export default API;
