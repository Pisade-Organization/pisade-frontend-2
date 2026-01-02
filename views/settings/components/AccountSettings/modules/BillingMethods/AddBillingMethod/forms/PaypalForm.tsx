import BaseInput from "@/components/base/BaseInput"

export default function PaypalForm() {
  return (
    <div className="w-full flex flex-col gap-3">
      <BaseInput 
        title="Account name"
        required
        placeholder="Enter your account name"
      />

      <BaseInput 
        title="Paypal email"
        required
        placeholder="Enter your email"
      />
    </div>
  )
}