import { Role } from "@/types/role.enum";

export const roleConfig = {
  [Role.STUDENT]: {
    title: "Transaction history",
    showViewAll: true,
    columns: [
      "ID",
      "Transaction",
      "Amount",
      "Payment method",
      "Date",
      "Status",
    ],
  },

  [Role.TUTOR]: {
    title: "Earnings & Withdraw",
    showViewAll: false,
    columns: [
      "ID",
      "Transaction",
      "Amount",
      "Date",
      "Payment method",
      "Status"
    ],
  },
} as const;