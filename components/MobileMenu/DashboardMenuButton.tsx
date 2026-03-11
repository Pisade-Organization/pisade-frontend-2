import { Menu } from "lucide-react";

export default function DashboardMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-11 h-11 rounded-[8px] border border-neutral-50 p-2 flex justify-center items-center"
      aria-label="Open menu"
    >
      <Menu width={20} height={20} className="text-neutral-700" />
    </button>
  );
}
