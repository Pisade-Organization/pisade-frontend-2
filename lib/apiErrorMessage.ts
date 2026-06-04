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

function firstApiMessage(message?: string | string[]): string | undefined {
  if (typeof message === "string" && message.trim()) {
    return message;
  }

  if (Array.isArray(message) && message.length > 0) {
    return message[0];
  }

  return undefined;
}

function looksLikeErrorCode(value?: string): boolean {
  return !!value && /^[A-Z0-9_]+$/.test(value);
}

export function getApiErrorMessage(error: unknown, fallback: string): string {
  const axiosError = error as AxiosError<ApiErrorPayload>;
  const payload = axiosError.response?.data;
  const apiError = payload?.error;
  const message =
    firstApiMessage(apiError?.message) ??
    firstApiMessage(apiError?.details?.message) ??
    firstApiMessage(payload?.message);

  if (message) {
    return message;
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return fallback;
}

export function getApiErrorCode(error: unknown): string | undefined {
  const axiosError = error as AxiosError<ApiErrorPayload>;
  const payload = axiosError.response?.data;
  const apiError = payload?.error;
  const directCode = apiError?.code ?? apiError?.details?.code ?? payload?.code;

  if (typeof directCode === "string" && directCode.trim()) {
    return directCode;
  }

  const messageCode =
    firstApiMessage(apiError?.message) ??
    firstApiMessage(apiError?.details?.message) ??
    firstApiMessage(payload?.message);

  if (looksLikeErrorCode(messageCode)) {
    return messageCode;
  }

  if (error instanceof Error && looksLikeErrorCode(error.message.trim())) {
    return error.message.trim();
  }

  return undefined;
}
