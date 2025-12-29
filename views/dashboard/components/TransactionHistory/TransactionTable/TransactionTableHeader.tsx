interface TransactionTableHeaderProps {
  columns: readonly string[];
}

export default function TransactionTableHeader({ columns }: TransactionTableHeaderProps) {
  return (
    <thead>
      <tr className="bg-electric-violet-25 gap-6">
        {columns.map((col, idx) => {
          const isTransaction = col === "Transaction";
          const transactionWidth = 30; // 30% for Transaction
          const otherColumnsCount = columns.length - 1;
          const otherColumnWidth = (100 - transactionWidth) / otherColumnsCount;
          const width = isTransaction ? transactionWidth : otherColumnWidth;
          
          return (
            <th key={idx} className="text-left py-3 px-5" style={{ width: `${width}%` }}>{col}</th>
          );
        })}
      </tr>
    </thead>
  );
}