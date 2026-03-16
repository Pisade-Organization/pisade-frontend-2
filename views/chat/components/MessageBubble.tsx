import type { ChatMessage } from "../mock"

interface MessageBubbleProps {
  message: ChatMessage
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isMine = message.sender === "me"

  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-3 py-2 lg:max-w-[70%] ${
          isMine ? "bg-electric-violet-500 text-white" : "bg-neutral-25 text-neutral-800"
        }`}
      >
        <p className="text-body-3 leading-relaxed">{message.text}</p>
        <p className={`mt-1 text-right text-[11px] ${isMine ? "text-white/80" : "text-neutral-400"}`}>
          {message.time}
        </p>
      </div>
    </div>
  )
}
