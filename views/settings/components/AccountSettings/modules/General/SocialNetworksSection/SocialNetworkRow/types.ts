export type SocialProvider = "google" | "facebook"

export interface SocialNetworkRowProps {
  provider: SocialProvider
  connected: boolean
  displayName?: string        // e.g. "Somchai Degrey"
  loading?: boolean

  onConnect: () => void
  onDisconnect: () => void
}
