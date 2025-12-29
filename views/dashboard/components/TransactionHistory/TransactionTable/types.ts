import { Transaction } from "../types";

export interface TransactionTableI {
  transactions: Transaction[];
  columns: readonly string[];
}