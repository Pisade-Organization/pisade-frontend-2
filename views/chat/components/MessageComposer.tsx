"use client"

import { useState } from "react"
import { SendHorizonal } from "lucide-react"

interface MessageComposerProps {
  onSend: (value: string) => void
}

export default function MessageComposer({ onSend }: MessageComposerProps) {
  const [value, setValue] = useState("")

  const handleSend = () => {
    const normalized = value.trim()
    if (!normalized) return

    onSend(normalized)
    setValue("")
  }

  return (
    <div className="border-t border-neutral-50 p-3 lg:p-4">
      <div className="flex items-center gap-2 rounded-xl border border-neutral-100 bg-white px-3 py-2">
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault()
              handleSend()
            }
          }}
          placeholder="Type a message..."
          className="h-10 w-full bg-transparent text-body-2 text-neutral-900 outline-none placeholder:text-neutral-400"
        />
        <button
          type="button"
          aria-label="Send message"
          onClick={handleSend}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-electric-violet-500 text-white"
        >
          <SendHorizonal size={16} />
        </button>
      </div>
    </div>
  )
}
