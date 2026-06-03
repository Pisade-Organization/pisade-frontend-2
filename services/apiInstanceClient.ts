import axios from "axios";
import { getSession } from "next-auth/react";
import type { Session } from "next-auth";
import type { AxiosRequestConfig } from "axios";
import { getApiBaseUrl } from "@/services/apiBaseUrl";

const SESSION_CACHE_TTL_MS = 15_000;

let cachedSession: Session | null = null;
let cachedSessionAt = 0;
let sessionRequestInFlight: Promise<Session | null> | null = null;

function clearSessionCache() {
  cachedSession = null;
  cachedSessionAt = 0;
}

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

async function refreshSession() {
  clearSessionCache();
  return getCachedSession();
}

type RetryableAxiosConfig = AxiosRequestConfig & {
  _retry?: boolean;
};

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

apiInstanceClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;
    const originalConfig = error?.config as RetryableAxiosConfig | undefined;

    if (status !== 401 || !originalConfig || originalConfig._retry) {
      return Promise.reject(error);
    }

    originalConfig._retry = true;
    const session = await refreshSession();
    const token = session?.access_token;

    if (!token) {
      return Promise.reject(error);
    }

    originalConfig.headers = {
      ...(originalConfig.headers as any),
      Authorization: `Bearer ${token}`,
    } as any;

    return apiInstanceClient.request(originalConfig);
  },
);

export default apiInstanceClient;
