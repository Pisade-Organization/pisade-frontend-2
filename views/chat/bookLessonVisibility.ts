export function shouldShowBookLessonButton(role?: string, tutorId?: string | null): boolean {
  return role === "STUDENT" && Boolean(tutorId)
}
