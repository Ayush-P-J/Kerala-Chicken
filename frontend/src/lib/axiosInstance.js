import axios from "axios";
import { getSession } from "next-auth/react";

const api = axios.create({
  baseURL: "http://localhost:4000/api/",
});

api.interceptors.request.use(async (config) => {
  const session = await getSession();

  if (session?.jwt) {
    config.headers.Authorization = `Bearer ${session.jwt}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
