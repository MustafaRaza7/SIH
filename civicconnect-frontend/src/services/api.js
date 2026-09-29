import axios from "axios";
import { GATEWAY_BASE_URL } from "../utils/constants";
import { getToken, clearSession } from "../utils/token";

// This axios instance is wired up and ready for when dummy data is swapped
// for the real Gateway. Every *Api.js file already imports it — flipping
// USE_DUMMY_DATA to false in each service file is the only change needed.
const api = axios.create({
  baseURL: GATEWAY_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error?.response?.status === 401) {
      clearSession();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
