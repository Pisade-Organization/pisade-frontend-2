import Typography from "@/components/base/Typography"
import BaseInput from "@/components/base/BaseInput"
export default function PromptPayForm({
  phoneNumber,
  setPhoneNumber
}: {
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
}) {
  return (
    <BaseInput 
      title="Phone number"
      leftIcon={
        <Typography variant="body-2" color="neutral-300">
          +66
        </Typography>
      }
      value={phoneNumber}
      onChange={e => setPhoneNumber(e.target.value)}
    />
  )
}