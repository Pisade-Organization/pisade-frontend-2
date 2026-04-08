const ABSOLUTE_URL_PATTERN = /^[a-zA-Z][a-zA-Z\d+.-]*:/

function getBackendBaseUrl(): string {
  return (process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || "").replace(/\/$/, "")
}

export function resolveMediaUrl(value?: string | null): string {
  const raw = value?.trim()

  if (!raw) return ""
  if (raw.startsWith("blob:") || raw.startsWith("data:")) return raw
  if (raw.startsWith("//")) return `https:${raw}`
  if (ABSOLUTE_URL_PATTERN.test(raw)) return raw

  const baseUrl = getBackendBaseUrl()
  if (!baseUrl) return raw

  return raw.startsWith("/") ? `${baseUrl}${raw}` : `${baseUrl}/${raw}`
}
