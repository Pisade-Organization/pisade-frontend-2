export interface ApiMeta {
  timestamp: string;
  path: string;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  meta: ApiMeta;
}

function isApiSuccessResponse<T>(payload: unknown): payload is ApiSuccessResponse<T> {
  return (
    typeof payload === "object" &&
    payload !== null &&
    "success" in payload &&
    "data" in payload
  );
}

export function unwrapApiResponse<T>(payload: ApiSuccessResponse<T> | T): T {
  if (isApiSuccessResponse<T>(payload)) {
    return payload.data;
  }

  return payload;
}
