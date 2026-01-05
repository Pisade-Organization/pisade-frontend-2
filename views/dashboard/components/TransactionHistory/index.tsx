import type { Role } from "@/types/role.enum"
import type { Transaction } from "./types"

import TransactionHistoryHeader from "./TransactionHistoryHeader";
import { TransactionList } from "./TransactionList";
import { roleConfig } from "./roleConfig";
import BaseButton from "@/components/base/BaseButton";

interface TransactionHistoryI {
  role: Role.STUDENT | Role.TUTOR;
  transactions: Transaction[];
  layout: "table" | "card";
  onViewAll?: () => void;
  onShowMore?: () => void;
}

export default function TransactionHistory({
  role,
  transactions,
  layout,
  onViewAll,
  onShowMore
}: TransactionHistoryI) {
  const config = roleConfig[role];

  return (
    <section className="
      w-full flex flex-col gap-4
      py-5 px-4 lg:px-20 lg:py-[60px] 
      bg-white
    ">
      <TransactionHistoryHeader 
        title={config.title}
        actionLabel={config.showViewAll ? "View all" : undefined}
        onActionClick={onViewAll}
      />

      <TransactionList 
        layout={layout}
        transactions={transactions}
        columns={config.columns}
      />

      {onShowMore && (
        <div className="flex justify-center">
          <BaseButton
            variant="secondary"
            typeStyle="outline"
            onClick={onShowMore}
          >
            Show more
          </BaseButton>
        </div>
      )}

    </section>
  )
}