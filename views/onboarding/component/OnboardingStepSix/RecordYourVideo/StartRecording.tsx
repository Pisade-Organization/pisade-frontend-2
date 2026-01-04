"use client"

import { useState, useRef, useEffect } from "react"
import Typography from "@/components/base/Typography"
import BaseButton from "@/components/base/BaseButton"
import { Video, Square, Circle } from "lucide-react"

interface StartRecordingProps {
  onRecordingComplete: (blob: Blob) => void
  onRecordingStateChange: (stream: MediaStream | null, isRecording: boolean) => void
  recordedVideoBlob: Blob | null
}

export default function StartRecording({ onRecordingComplete, onRecordingStateChange, recordedVideoBlob }: StartRecordingProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const timeIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const videoElementRef = useRef<HTMLVideoElement | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  const MAX_RECORDING_TIME = 120 // 2 minutes in seconds

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      stopRecording()
    }
  }, [])

  const startRecording = async () => {
    try {
      setError(null)
      // Stop any existing stream first
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
      
      const originalStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user" }, 
        audio: true 
      })
      
      // Create a canvas to flip the video horizontally
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        throw new Error("Could not get canvas context")
      }

      const videoTrack = originalStream.getVideoTracks()[0]
      const videoSettings = videoTrack.getSettings()
      canvas.width = videoSettings.width || 640
      canvas.height = videoSettings.height || 480
      canvasRef.current = canvas

      // Create a video element to process the stream
      const videoElement = document.createElement('video')
      videoElement.srcObject = originalStream
      videoElement.autoplay = true
      videoElement.muted = true
      videoElement.playsInline = true
      videoElementRef.current = videoElement

      await new Promise((resolve) => {
        videoElement.onloadedmetadata = () => {
          videoElement.play().then(resolve).catch(resolve)
        }
      })

      // Create a new stream from the flipped canvas
      const flippedStream = canvas.captureStream(30)
      const audioTrack = originalStream.getAudioTracks()[0]
      if (audioTrack) {
        flippedStream.addTrack(audioTrack)
      }

      // Draw flipped video to canvas
      const drawFrame = () => {
        if (videoElement.readyState >= 2 && canvas && ctx) {
          ctx.save()
          ctx.scale(-1, 1)
          ctx.drawImage(videoElement, -canvas.width, 0, canvas.width, canvas.height)
          ctx.restore()
        }
        if (mediaRecorderRef.current?.state === 'recording') {
          animationFrameRef.current = requestAnimationFrame(drawFrame)
        }
      }
      drawFrame()
      
      streamRef.current = originalStream // Keep original for preview
      chunksRef.current = []

      const mediaRecorder = new MediaRecorder(flippedStream, {
        mimeType: 'video/webm;codecs=vp8,opus'
      })

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' })
        onRecordingComplete(blob)
        stopRecording()
      }

      mediaRecorderRef.current = mediaRecorder
      mediaRecorder.start(1000) // Collect data every second
      setIsRecording(true)
      setRecordingTime(0)
      onRecordingStateChange(flippedStream, true)

      // Start timer
      timeIntervalRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          const newTime = prev + 1
          if (newTime >= MAX_RECORDING_TIME) {
            stopRecording()
            return MAX_RECORDING_TIME
          }
          return newTime
        })
      }, 1000)

      // Auto-stop at 2 minutes
      timerRef.current = setTimeout(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
          mediaRecorderRef.current.stop()
        }
      }, MAX_RECORDING_TIME * 1000)

    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to access camera")
      console.error("Error accessing camera:", err)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop()
    }
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }

    if (videoElementRef.current) {
      videoElementRef.current.srcObject = null
      videoElementRef.current = null
    }

    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      }
      canvasRef.current = null
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }

    if (timeIntervalRef.current) {
      clearInterval(timeIntervalRef.current)
      timeIntervalRef.current = null
    }

    setIsRecording(false)
    setRecordingTime(0)
    onRecordingStateChange(null, false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleButtonClick = () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <Typography variant="body-3" color="neutral-400">
        Record your video directly, or upload a link from YouTube or Vimeo to get started.
      </Typography>

      {error && (
        <Typography variant="body-4" color="red-normal">
          {error}
        </Typography>
      )}

      {isRecording && (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Circle className="w-3 h-3 fill-red-normal text-red-normal animate-pulse" />
            <Typography variant="body-3" color="neutral-700">
              Recording: {formatTime(recordingTime)} / {formatTime(MAX_RECORDING_TIME)}
            </Typography>
          </div>
        </div>
      )}

      <BaseButton
        variant="secondary"
        iconLeft={isRecording ? <Square className="w-5 h-5"/> : <Video className="w-5 h-5"/>}
        onClick={handleButtonClick}
      >
        {isRecording ? "Stop recording" : recordedVideoBlob ? "Record again" : "Start recording"}
      </BaseButton>
    </div>
  )
}