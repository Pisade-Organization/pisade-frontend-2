import PaymentHistoryRowMobile from "./PaymentHistoryRowMobile"
import PaymentHistoryRowDesktop from "./PaymentHistoryRowDesktop"
import PaymentHistoryTableHeader from "./PaymentHistoryTableHeader"
import { PaymentHistoryItem } from "../index";

interface PaymentHistoryTableProps {
  data: PaymentHistoryItem[];
}

export default function PaymentHistoryTable({ data }: PaymentHistoryTableProps) {
  return (
    <>
      {/* MOBILE */}
      <div className="w-full flex flex-col lg:hidden">
        {data.map((item, index) => (
          <PaymentHistoryRowMobile
            key={index}
            date={item.date}
            time={item.time}
            price={item.price}
            lastFourDigits={item.lastFourDigits}
            cardType={item.cardType}
            status={item.status}
          />
        ))}
      </div>

      {/* DESKTOP */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <PaymentHistoryTableHeader />
          <tbody>
            {data.map((item, index) => (
              <PaymentHistoryRowDesktop
                key={index}
                date={item.date}
                time={item.time}
                price={item.price}
                lastFourDigits={item.lastFourDigits}
                cardType={item.cardType}
                status={item.status}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}