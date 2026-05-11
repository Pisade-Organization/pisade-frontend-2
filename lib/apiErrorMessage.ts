import type { AxiosError } from "axios";

type ApiErrorPayload = {
  code?: string;
  message?: string | string[];
  error?: {
    code?: string;
    message?: string | string[];
    details?: {
      code?: string;
      message?: string | string[];
    };
  };
};

export function getApiErrorMessage(error: unknown, fallback: string): string {
  const axiosError = error as AxiosError<ApiErrorPayload>;
  const payload = axiosError.response?.data;
  const apiError = payload?.error;
  const message = apiError?.message ?? apiError?.details?.message ?? payload?.message;

  if (typeof message === "string" && message.trim()) {
    return message;
  }

  if (Array.isArray(message) && message.length > 0) {
    return message[0];
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return fallback;
}
