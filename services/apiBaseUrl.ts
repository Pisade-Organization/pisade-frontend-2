export const BACKEND_PROXY_PREFIX = "/api/backend";

export function getApiBaseUrl(): string {
  if (typeof window !== "undefined") {
    return BACKEND_PROXY_PREFIX;
  }

  return process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || "";
}
