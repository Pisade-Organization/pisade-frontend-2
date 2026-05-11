export function buildTutorProfilePath(locale: string | undefined, tutorId: string): string {
  const normalizedLocale = locale?.replace(/^\/+|\/+$/g, "") || "en"

  return `/${normalizedLocale}/tutor/${tutorId}`
}
