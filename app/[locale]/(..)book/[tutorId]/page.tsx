// Intercepting route - intercepts from one level up (e.g., /tutor/[tutorId] -> /book/[tutorId])
// The underlying page content is preserved, and BookLessonDialogWrapper shows the modal
export default function BookingInterceptUp() {
  // Return null - Next.js will keep the previous page content visible
  // The BookLessonDialogWrapper in layout will detect the URL and show the modal overlay
  return null;
}

