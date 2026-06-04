import axios from "axios";

const API = axios.create({
  baseURL: "https://fds1-t172.onrender.com/api"
});

export default API;
