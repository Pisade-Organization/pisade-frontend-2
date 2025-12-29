import { TransactionStatus } from "./types"

export const STATUS_MAP = {
  [TransactionStatus.COMPLETED]: {
    label: "Completed",
    color: "green-normal"
  },

  [TransactionStatus.PROCESSING]: {
    label: "Processing",
    color: "orange-normal"
  },

  [TransactionStatus.CANCELLED]: {
    label: "Cancelled",
    color: "neutral-300"
  }
}