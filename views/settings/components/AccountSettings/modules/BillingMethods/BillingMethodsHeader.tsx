import Typography from "@/components/base/Typography"
export default function BillingMethodsHeader() {    
  return (
    <div className="w-full flex flex-col gap-1 items-start">
      <Typography variant={{ base: "title-2", lg: "title-1" }} color="neutral-800">
        Payout Methods
      </Typography>

      <Typography variant={{ base: "body-3", lg: "body-2" }} color="neutral-400">
        Connect Stripe Express to manage the bank account used for tutor withdrawals.
      </Typography>
    </div>
  )
}
