import axios from "axios";
import { getSession } from "next-auth/react";

const apiInstanceClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

apiInstanceClient.interceptors.request.use(async (config) => {
  const session = await getSession();
  const token = (session as any)?.access_token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default apiInstanceClient;
