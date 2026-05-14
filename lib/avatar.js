import { resolveMediaUrl } from "./media.ts"

export function resolveUserAvatarUrl(profileAvatarUrl, sessionAvatarUrl) {
  return resolveMediaUrl(profileAvatarUrl) || resolveMediaUrl(sessionAvatarUrl) || undefined
}
