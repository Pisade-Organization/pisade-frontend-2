import TransactionDateCell from "../cells/TransactionDateCell";
import TransactionAmountCell from "../cells/TransactionAmountCell";
import TransactionStatusBadge from "../badges/TransactionStatusBadge";
import PaymentMethodCell from "../cells/PaymentMethodCell";
import Typography from "@/components/base/Typography";

import { Transaction } from "../types";
import TransactionIdCell from "../cells/TransactionIdCell";
import TransactionTitleCell from "../cells/TransactionTitleCell";

interface TransactionCardProps {
  transaction: Transaction;
}

export default function TransactionCard({ transaction }: TransactionCardProps) {
  return (
    <div className="rounded-xl border border-neutral-50 p-4">

      <div className="flex flex-col gap-2">

        <div className="inline-flex justify-between">
          <TransactionIdCell id={transaction.id} />
          <TransactionDateCell date={transaction.date} />
        </div>

        <div className="w-full border-t border-neutral-50" />

        <TransactionTitleCell title={`Paid for ${transaction.lessonsCount} lessons`}/>

        <div className="w-full inline-flex justify-between">
          <Typography variant="body-3" color="neutral-300">
            Amount
          </Typography>

          <TransactionAmountCell amount={transaction.amount} />
        </div>

        <div className="w-full inline-flex justify-between">
          <Typography variant="body-3" color="neutral-300">
            Payment method
          </Typography>

          <PaymentMethodCell paymentMethod={transaction.paymentMethod} />
        </div>

        <div className="w-full inline-flex justify-between">
          <Typography variant="body-3" color="neutral-300">
            Status
          </Typography>

          <TransactionStatusBadge status={transaction.status} />
        </div>
      </div>


    </div>
  );
}
