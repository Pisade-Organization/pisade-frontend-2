import axios from "axios";
import { getSession } from "next-auth/react";
import type { Session } from "next-auth";
import { getApiBaseUrl } from "@/services/apiBaseUrl";

const SESSION_CACHE_TTL_MS = 15_000;

let cachedSession: Session | null = null;
let cachedSessionAt = 0;
let sessionRequestInFlight: Promise<Session | null> | null = null;

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
  baseURL: getApiBaseUrl(),
  withCredentials: true,
});

apiInstanceClient.interceptors.request.use(async (config) => {
  const session = await getCachedSession();
  const token = session?.access_token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default apiInstanceClient;
