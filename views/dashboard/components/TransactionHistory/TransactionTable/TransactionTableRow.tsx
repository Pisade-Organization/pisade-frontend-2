import TransactionIdCell from "../cells/TransactionIdCell";
import TransactionTitleCell from "../cells/TransactionTitleCell";
import TransactionAmountCell from "../cells/TransactionAmountCell";
import TransactionDateCell from "../cells/TransactionDateCell";
import PaymentMethodCell from "../cells/PaymentMethodCell";
import TransactionStatusBadge from "../badges/TransactionStatusBadge";
import { Transaction } from "../types";

interface TransactionTableRowProps {
  transaction: Transaction;
  columns: readonly string[];
}

export default function TransactionTableRow({ transaction, columns }: TransactionTableRowProps) {
  const renderCell = (column: string) => {
    switch (column) {
      case "ID":
        return <TransactionIdCell id={transaction.id} />;
      case "Transaction":
        return <TransactionTitleCell title={transaction.title} />;
      case "Amount":
        return <TransactionAmountCell amount={transaction.amount} />;
      case "Date":
        return <TransactionDateCell date={transaction.date} />;
      case "Payment method":
        return <PaymentMethodCell paymentMethod={transaction.paymentMethod} />;
      case "Status":
        return <TransactionStatusBadge status={transaction.status} />;
      default:
        return null;
    }
  };

  return (
    <tr className="w-full border-b border-neutral-25">
      {columns.map((column, index) => {
        const isTransaction = column === "Transaction";
        const transactionWidth = 30; // 30% for Transaction
        const otherColumnsCount = columns.length - 1;
        const otherColumnWidth = (100 - transactionWidth) / otherColumnsCount;
        const width = isTransaction ? transactionWidth : otherColumnWidth;
        
        return (
          <td key={index} className="text-left py-4 px-5" style={{ width: `${width}%` }}>
            {renderCell(column)}
          </td>
        );
      })}
    </tr>
  );
}

