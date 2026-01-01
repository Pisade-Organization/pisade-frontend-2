import PaymentHistoryHeader from "./PaymentHistoryHeader"
import PaymentHistoryTable from "./PaymentHistoryTable"
import { PaymentStatus } from "@/views/onboarding/types/paymentStatus.types";

export interface PaymentHistoryItem {
  date: string;
  time: string;
  price: number;
  lastFourDigits?: string;
  cardType: string;
  status: PaymentStatus;
}

const mockPaymentHistory: PaymentHistoryItem[] = [
  {
    date: "Oct 13, 2025",
    time: "14:30",
    price: 29.90,
    lastFourDigits: "1627",
    cardType: "Mastercard",
    status: PaymentStatus.COMPLETE
  },
  {
    date: "Oct 12, 2025",
    time: "16:45",
    price: 29.90,
    lastFourDigits: "1627",
    cardType: "Mastercard",
    status: PaymentStatus.PROCESSING
  },
  {
    date: "Oct 11, 2025",
    time: "10:20",
    price: 29.90,
    lastFourDigits: "",
    cardType: "Promptpay Qr",
    status: PaymentStatus.COMPLETE
  },
  {
    date: "Oct 10, 2025",
    time: "09:15",
    price: 29.90,
    lastFourDigits: "1627",
    cardType: "Visacard",
    status: PaymentStatus.COMPLETE
  },
  {
    date: "Oct 9, 2025",
    time: "15:30",
    price: 29.90,
    lastFourDigits: "1627",
    cardType: "Mastercard",
    status: PaymentStatus.COMPLETE
  },
  {
    date: "Oct 8, 2025",
    time: "11:45",
    price: 29.90,
    lastFourDigits: "1627",
    cardType: "Mastercard",
    status: PaymentStatus.FAILED
  },
  {
    date: "Oct 7, 2025",
    time: "13:20",
    price: 29.90,
    lastFourDigits: "1627",
    cardType: "Mastercard",
    status: PaymentStatus.COMPLETE
  },
  {
    date: "Oct 6, 2025",
    time: "08:30",
    price: 29.90,
    lastFourDigits: "1627",
    cardType: "Mastercard",
    status: PaymentStatus.COMPLETE
  },
  {
    date: "Oct 5, 2025",
    time: "17:15",
    price: 29.90,
    lastFourDigits: "",
    cardType: "Promptpay Qr",
    status: PaymentStatus.COMPLETE
  },
  {
    date: "Oct 4, 2025",
    time: "12:00",
    price: 29.90,
    lastFourDigits: "1627",
    cardType: "Visacard",
    status: PaymentStatus.COMPLETE
  }
];

export default function PaymentHistory() {
  return (
    <div className="w-full flex flex-col gap-4 bg-white px-4 lg:py-8 lg:px-12 rounded-2xl">
      <PaymentHistoryHeader />
      <PaymentHistoryTable data={mockPaymentHistory} />
    </div>
  )
}

