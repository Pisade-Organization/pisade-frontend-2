import axios from "axios";
import { getSession } from "next-auth/react";

const SESSION_CACHE_TTL_MS = 15_000;

let cachedSession: any | null = null;
let cachedSessionAt = 0;
let sessionRequestInFlight: Promise<any | null> | null = null;

async function getCachedSession() {
  const now = Date.now();

  if (cachedSession && now - cachedSessionAt < SESSION_CACHE_TTL_MS) {
    return cachedSession;
  }

  if (sessionRequestInFlight) {
    return sessionRequestInFlight;
  }

  sessionRequestInFlight = getSession()
    .then((session) => {
      cachedSession = session;
      cachedSessionAt = Date.now();
      return session;
    })
    .finally(() => {
      sessionRequestInFlight = null;
    });

  return sessionRequestInFlight;
}

const apiInstanceClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

apiInstanceClient.interceptors.request.use(async (config) => {
  const session = await getCachedSession();
  const token = (session as any)?.access_token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default apiInstanceClient;
