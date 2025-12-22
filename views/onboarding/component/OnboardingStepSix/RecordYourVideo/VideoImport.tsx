"use client"

import { useState } from "react"
import Typography from "@/components/base/Typography"
import BaseInput from "@/components/base/BaseInput"

interface VideoImportProps {
  onVideoLinkChange: (link: string) => void
  videoLink: string
  recordedVideoBlob: Blob | null
}

export default function VideoImport({ onVideoLinkChange, videoLink, recordedVideoBlob }: VideoImportProps) {
  const [inputValue, setInputValue] = useState(videoLink)
  const [error, setError] = useState<string | null>(null)

  const isValidYouTubeUrl = (url: string): boolean => {
    const patterns = [
      /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/.+/,
      /^https?:\/\/youtube\.com\/watch\?v=.+/,
      /^https?:\/\/youtu\.be\/.+/
    ]
    return patterns.some(pattern => pattern.test(url))
  }

  const isValidVimeoUrl = (url: string): boolean => {
    return /^https?:\/\/(www\.)?vimeo\.com\/.+/.test(url)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    setError(null)

    if (value.trim() === "") {
      onVideoLinkChange("")
      return
    }

    if (isValidYouTubeUrl(value) || isValidVimeoUrl(value)) {
      onVideoLinkChange(value)
      setError(null)
    } else if (value.length > 10) {
      // Only show error if user has typed a reasonable amount
      setError("Please enter a valid YouTube or Vimeo URL")
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div>
        <Typography variant="label-3" color="neutral-800">
          Or paste link to your video
        </Typography>
        
        <Typography variant={{ base: "body-3" }} color="neutral-400">
          Learn how to upload videos to <span className="underline text-neutral-800">Youtube</span> or <span className="underline text-neutral-800">Vimeo</span>
        </Typography>
      </div>

      <BaseInput 
        placeholder="www.youtube.com/watch?v=I5aZ.."
        value={inputValue}
        onChange={handleInputChange}
        errorMessage={error || undefined}
        state={error ? "error" : "default"}
      />

    </div>
  )
}