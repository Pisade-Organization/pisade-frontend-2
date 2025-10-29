import { Calendar, Heart } from "lucide-react";

export default function TutorDetailMenuButton() {
  return (
    <div className="flex justify-center items-center">
      <button className="w-11 h-11 flex justify-center items-center">
        <Calendar size={24} className="text-neutral-700" />
      </button>
      <button className="w-11 h-11 flex justify-center items-center">
        <Heart size={24} className="text-neutral-700" />
      </button>
    </div>
  );
}


