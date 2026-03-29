"use client"

import { useMemo, useRef, useState } from "react"
import { Paperclip, SendHorizonal, X } from "lucide-react"
import Typography from "@/components/base/Typography"
import { getPresignedUrl, uploadFileToPresignedUrl } from "@/services/upload"
import type { ChatSendAttachmentInput } from "@/services/chat/types"
import type { ChatMessage } from "../mock"

const MAX_FILES_PER_MESSAGE = 10
const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024
const ALLOWED_CHAT_MIME_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "text/plain",
  "text/csv",
  "application/zip",
  "application/x-zip-compressed",
  "application/x-rar-compressed",
  "application/vnd.rar",
  "application/x-7z-compressed",
])

interface ComposerAttachmentItem {
  localId: string
  file: File
  kind: "IMAGE" | "FILE"
  status: "uploading" | "uploaded" | "failed"
  progress: number
  storageKey?: string
}

interface MessageComposerProps {
  onSend: (value: string, replyToId?: string, attachments?: ChatSendAttachmentInput[]) => Promise<boolean>
  disabled?: boolean
  replyTarget?: ChatMessage | null
  onCancelReply?: () => void
  currentUserId?: string
}

export default function MessageComposer({
  onSend,
  disabled = false,
  replyTarget,
  onCancelReply,
  currentUserId,
}: MessageComposerProps) {
  const [value, setValue] = useState("")
  const [attachments, setAttachments] = useState<ComposerAttachmentItem[]>([])
  const [errorMessage, setErrorMessage] = useState("")
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const hasPendingUpload = attachments.some((attachment) => attachment.status === "uploading")
  const hasFailedUpload = attachments.some((attachment) => attachment.status === "failed")
  const hasUploadedAttachment = attachments.some((attachment) => attachment.status === "uploaded")

  const canSend = useMemo(() => {
    if (disabled || hasPendingUpload || hasFailedUpload) {
      return false
    }

    const normalized = value.trim()
    return Boolean(normalized) || hasUploadedAttachment
  }, [disabled, hasFailedUpload, hasPendingUpload, hasUploadedAttachment, value])

  const toAttachmentInput = (item: ComposerAttachmentItem): ChatSendAttachmentInput | null => {
    if (item.status !== "uploaded" || !item.storageKey) {
      return null
    }

    return {
      kind: item.kind,
      mimeType: item.file.type,
      originalName: item.file.name,
      sizeBytes: item.file.size,
      storageKey: item.storageKey,
    }
  }

  const uploadAttachment = async (localId: string, file: File) => {
    if (!currentUserId) {
      setAttachments((prev) =>
        prev.map((item) =>
          item.localId === localId
            ? {
                ...item,
                status: "failed",
              }
            : item,
        ),
      )
      setErrorMessage("Unable to upload attachments: missing current user session.")
      return
    }

    const presigned = await getPresignedUrl(file.name, file.type, `chat/${currentUserId}`)
    if (!presigned?.uploadUrl || !presigned.key) {
      setAttachments((prev) =>
        prev.map((item) =>
          item.localId === localId
            ? {
                ...item,
                status: "failed",
              }
            : item,
        ),
      )
      setErrorMessage(`Failed to get upload URL for ${file.name}.`)
      return
    }

    const uploaded = await uploadFileToPresignedUrl(presigned.uploadUrl, file, (progress) => {
      setAttachments((prev) =>
        prev.map((item) =>
          item.localId === localId
            ? {
                ...item,
                progress,
              }
            : item,
        ),
      )
    })

    if (!uploaded) {
      setAttachments((prev) =>
        prev.map((item) =>
          item.localId === localId
            ? {
                ...item,
                status: "failed",
              }
            : item,
        ),
      )
      setErrorMessage(`Upload failed for ${file.name}. Remove it or retry by re-selecting.`)
      return
    }

    setAttachments((prev) =>
      prev.map((item) =>
        item.localId === localId
          ? {
              ...item,
              status: "uploaded",
              progress: 100,
              storageKey: presigned.key,
            }
          : item,
      ),
    )
  }

  const handleSelectFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) {
      return
    }

    setErrorMessage("")
    const selected = Array.from(fileList)
    const remainingSlots = MAX_FILES_PER_MESSAGE - attachments.length
    if (remainingSlots <= 0) {
      setErrorMessage(`You can attach up to ${MAX_FILES_PER_MESSAGE} files per message.`)
      return
    }

    const files = selected.slice(0, remainingSlots)
    const nextItems: ComposerAttachmentItem[] = []

    for (const file of files) {
      if (!ALLOWED_CHAT_MIME_TYPES.has(file.type)) {
        setErrorMessage(`Unsupported file type: ${file.name}`)
        continue
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        setErrorMessage(`File exceeds 25MB limit: ${file.name}`)
        continue
      }

      nextItems.push({
        localId: crypto.randomUUID(),
        file,
        kind: file.type.startsWith("image/") ? "IMAGE" : "FILE",
        status: "uploading",
        progress: 0,
      })
    }

    if (nextItems.length === 0) {
      return
    }

    setAttachments((prev) => [...prev, ...nextItems])
    nextItems.forEach((item) => {
      void uploadAttachment(item.localId, item.file)
    })

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSend = async () => {
    if (!canSend) return

    const normalized = value.trim()
    const uploadedAttachments = attachments
      .map(toAttachmentInput)
      .filter((attachment): attachment is ChatSendAttachmentInput => Boolean(attachment))

    const success = await onSend(normalized, replyTarget?.id, uploadedAttachments)
    if (success) {
      setValue("")
      setAttachments([])
      setErrorMessage("")
      onCancelReply?.()
    }
  }

  const removeAttachment = (localId: string) => {
    setAttachments((prev) => prev.filter((item) => item.localId !== localId))
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div className="border-t border-neutral-50 p-3 lg:p-4">
      {replyTarget ? (
        <div className="mb-2 flex items-start justify-between rounded-[10px] border border-neutral-100 bg-white px-3 py-2">
          <div className="min-w-0">
            <Typography variant="body-4" color="neutral-400">
              Replying to {replyTarget.sender === "me" ? "yourself" : "them"}
            </Typography>
            <Typography variant="body-3" color="neutral-700" className="truncate">
              {replyTarget.text}
            </Typography>
          </div>
          <button
            type="button"
            onClick={onCancelReply}
            aria-label="Cancel reply"
            className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-full text-neutral-400 hover:bg-neutral-25"
          >
            <X size={14} />
          </button>
        </div>
      ) : null}

      {attachments.length > 0 ? (
        <div className="mb-2 space-y-2">
          {attachments.map((attachment) => (
            <div
              key={attachment.localId}
              className="flex items-center justify-between rounded-[10px] border border-neutral-100 bg-white px-3 py-2"
            >
              <div className="min-w-0">
                <Typography variant="body-3" color="neutral-700" className="truncate">
                  {attachment.file.name}
                </Typography>
                <Typography variant="body-4" color="neutral-400">
                  {formatSize(attachment.file.size)} · {attachment.status === "uploaded" ? "Uploaded" : attachment.status === "uploading" ? `${attachment.progress}%` : "Failed"}
                </Typography>
              </div>
              <button
                type="button"
                onClick={() => removeAttachment(attachment.localId)}
                aria-label={`Remove ${attachment.file.name}`}
                className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-full text-neutral-400 hover:bg-neutral-25"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      ) : null}

      {errorMessage ? (
        <Typography variant="body-4" color="red-500" className="mb-2">
          {errorMessage}
        </Typography>
      ) : null}

      <div className="flex items-center gap-2 rounded-xl border border-neutral-100 bg-white px-3 py-2">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(event) => handleSelectFiles(event.target.files)}
        />
        <button
          type="button"
          aria-label="Attach files"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-neutral-400 hover:bg-neutral-25"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled || attachments.length >= MAX_FILES_PER_MESSAGE}
        >
          <Paperclip size={16} />
        </button>
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault()
              void handleSend()
            }
          }}
          placeholder="Type a message..."
          disabled={disabled}
          className="h-10 w-full bg-transparent text-body-2 text-neutral-900 outline-none placeholder:text-neutral-400"
        />
        <button
          type="button"
          aria-label="Send message"
          onClick={() => void handleSend()}
          disabled={!canSend}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-electric-violet-500 text-white"
        >
          <SendHorizonal size={16} />
        </button>
      </div>
    </div>
  )
}
