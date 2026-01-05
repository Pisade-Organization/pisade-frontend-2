// For direct navigation/bookmarking - render home page content
// The dialog wrapper will show the modal overlay on top
import SearchPage from "@/views/search/pages/Search";

export default function Booking() {
  // Render the home page content so the underlying page is visible
  // The BookLessonDialogWrapper in layout will detect the URL and show the modal overlay
  return (
    <div>
      <SearchPage />
    </div>
  );
}