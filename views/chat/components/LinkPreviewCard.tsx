"use client"

import { useEffect, useState } from "react"
import Typography from "@/components/base/Typography"
import type { OgPreviewResult } from "@/app/api/og-preview/route"

interface LinkPreviewCardProps {
  url: string
}

export default function LinkPreviewCard({ url }: LinkPreviewCardProps) {
  const [preview, setPreview] = useState<OgPreviewResult | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    setPreview(null)
    setFailed(false)

    fetch(`/api/og-preview?url=${encodeURIComponent(url)}`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: OgPreviewResult) => {
        if (data.title || data.description || data.image) {
          setPreview(data)
        } else {
          setFailed(true)
        }
      })
      .catch(() => setFailed(true))
  }, [url])

  if (failed || !preview) return null

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-1 flex cursor-pointer items-stretch overflow-hidden rounded-[10px] bg-white transition-opacity hover:opacity-90"
    >
      {preview.image ? (
        <div className="w-24 shrink-0">
          <img
            src={preview.image}
            alt={preview.title ?? ""}
            className="h-full w-full object-cover"
          />
        </div>
      ) : null}
      <div className="flex min-w-0 flex-col justify-center gap-0.5 px-3 py-2">
        {preview.title ? (
          <Typography variant="label-3" color="neutral-800" className="line-clamp-1">
            {preview.title}
          </Typography>
        ) : null}
        {preview.description ? (
          <Typography variant="body-4" color="neutral-500" className="line-clamp-2">
            {preview.description}
          </Typography>
        ) : null}
      </div>
    </a>
  )
}
