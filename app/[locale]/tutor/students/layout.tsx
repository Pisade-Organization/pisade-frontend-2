import TutorTabs from '@/components/student/tutors/TutorTabs';
import Navbar from '@/components/Navbar';

export default function TutorStudentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar variant="tutor_dashboard" />
      <TutorTabs basePath="/tutor/students" mode="tutor-students" />
      <div>{children}</div>
    </div>
  );
}
