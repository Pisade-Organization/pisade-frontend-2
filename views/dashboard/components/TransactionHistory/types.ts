import { TransactionStatus } from "./badges/TransactionStatusBadge/types";
import { PaymentMethod } from "./badges/PaymentMethodBadge/types";

export interface Transaction {
  id: string;
  title: string;
  lessonsCount?: number;
  amount: string;
  date: string;
  paymentMethod: PaymentMethod;
  status: TransactionStatus;
}

