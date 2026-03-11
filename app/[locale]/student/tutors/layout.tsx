import TutorTabs from '@/components/student/tutors/TutorTabs';
import Navbar from '@/components/Navbar';

export default function TutorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar variant="student_dashboard" />
      <TutorTabs />
      <div>{children}</div>
    </div>
  );
}
