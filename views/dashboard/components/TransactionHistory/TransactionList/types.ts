import type { Transaction } from "../types";

export type TransactionListLayout = "table" | "card";

export interface TransactionListI {
    layout: TransactionListLayout;
    transactions: Transaction[];
    columns?: readonly string[];
}