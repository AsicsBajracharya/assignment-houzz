import axios from "axios";
import config from "../app/config";

const {
  API: { baseURL },
} = config;

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  // transformRequest: [(data) => JSON.stringify(data)],
});

export default api;
