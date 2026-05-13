import { NextRequest, NextResponse } from "next/server"
import ogs from "open-graph-scraper"

const cache = new Map<string, { data: OgPreviewResult; expiresAt: number }>()
const CACHE_TTL_MS = 10 * 60 * 1000

export interface OgPreviewResult {
  url: string
  title?: string
  description?: string
  image?: string
  siteName?: string
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url")
  if (!url) {
    return NextResponse.json({ error: "Missing url" }, { status: 400 })
  }

  const cached = cache.get(url)
  if (cached && cached.expiresAt > Date.now()) {
    return NextResponse.json(cached.data)
  }

  try {
    const { result } = await ogs({ url, timeout: 5000 })

    const image =
      Array.isArray(result.ogImage) && result.ogImage.length > 0
        ? result.ogImage[0].url
        : undefined

    const data: OgPreviewResult = {
      url,
      title: result.ogTitle ?? result.dcTitle,
      description: result.ogDescription ?? result.dcDescription,
      image,
      siteName: result.ogSiteName,
    }

    cache.set(url, { data, expiresAt: Date.now() + CACHE_TTL_MS })
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: "Failed to fetch preview" }, { status: 422 })
  }
}
