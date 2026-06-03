export function canOpenBookingPage(role?: string | null): boolean {
  return role === "STUDENT"
}
