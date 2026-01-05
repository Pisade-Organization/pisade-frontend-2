// Intercepting route - shows modal overlay while keeping underlying page visible
// This intercepts /book/[tutorId] when navigating from pages at the same level
// The underlying page content is preserved, and BookLessonDialogWrapper shows the modal
export default function BookingIntercept() {
  // Return null - Next.js will keep the previous page content visible
  // The BookLessonDialogWrapper in layout will detect the URL and show the modal overlay
  return null;
}

