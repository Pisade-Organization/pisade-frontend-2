import { Menu } from "lucide-react";

export default function SearchMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-11 h-11 rounded-lg cursor-pointer flex items-center justify-center p-[1px]"
      style={{
        background:
          "linear-gradient(110.21deg, rgba(255, 255, 255, 0.7) 2.78%, rgba(255, 250, 203, 0.53) 58.48%, rgba(255, 57, 57, 0.07) 72.66%, rgba(255, 255, 255, 0.59) 100%)",
      }}
    >
      <div className="bg-black rounded-lg h-full w-full flex items-center justify-center bg-gradient-to-r from-white/5 to-white/25">
        <Menu width={20} height={20} color="white" />
      </div>
    </button>
  );
}


