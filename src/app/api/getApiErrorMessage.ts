interface ApiErrorData {
  message?: unknown;
}

interface ApiError {
  data?: unknown;
}

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (typeof error !== "object" || error === null || !("data" in error)) {
    return fallback;
  }

  const data = (error as ApiError).data;

  if (typeof data !== "object" || data === null) {
    return fallback;
  }

  const { message } = data as ApiErrorData;

  return typeof message === "string" ? message : fallback;
}
