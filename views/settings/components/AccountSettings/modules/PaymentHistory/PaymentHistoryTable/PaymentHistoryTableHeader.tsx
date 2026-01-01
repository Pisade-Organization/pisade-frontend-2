import Typography from "@/components/base/Typography";

export default function PaymentHistoryTableHeader() {
  return (
    <thead>
      <tr className="border-b-[1.5px] border-neutral-50">
        <th className="text-left py-5 px-4">
          <Typography variant="body-4" color="neutral-500">
            Date&time
          </Typography>
        </th>
        <th className="text-left py-5 px-4">
          <Typography variant="body-4" color="neutral-500">
            Payment method
          </Typography>
        </th>
        <th className="text-right py-5 px-4">
          <Typography variant="body-4" color="neutral-500">
            Amount
          </Typography>
        </th>
        <th className="text-right py-5 px-4">
          <Typography variant="body-4" color="neutral-500">
            Status
          </Typography>
        </th>
      </tr>
    </thead>
  );
}

