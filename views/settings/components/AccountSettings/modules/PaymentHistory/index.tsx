import PaymentHistoryHeader from "./PaymentHistoryHeader"
import PaymentHistoryTable from "./PaymentHistoryTable"
import { PaymentStatus } from "@/views/onboarding/types/paymentStatus.types";
import { useStudentTransactions } from "@/hooks/settings/queries";

export interface PaymentHistoryItem {
  date: string;
  time: string;
  price: number;
  lastFourDigits?: string;
  cardType: string;
  status: PaymentStatus;
}

function mapStatus(status: string): PaymentStatus {
  if (status === "Completed") return PaymentStatus.COMPLETE;
  if (status === "Cancel") return PaymentStatus.FAILED;
  return PaymentStatus.PROCESSING;
}

export default function PaymentHistory() {
  const { data: transactions = [] } = useStudentTransactions();
  const paymentHistory: PaymentHistoryItem[] = transactions.map((item) => {
    const date = new Date(item.date);
    return {
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }),
      price: Number(item.amount),
      lastFourDigits: "",
      cardType: item.paymentMethod ?? "Wallet",
      status: mapStatus(item.status),
    };
  });

  return (
    <div className="w-full flex flex-col gap-4 bg-white px-4 lg:py-8 lg:px-12 rounded-2xl">
      <PaymentHistoryHeader />
      <PaymentHistoryTable data={paymentHistory} />
    </div>
  )
}
