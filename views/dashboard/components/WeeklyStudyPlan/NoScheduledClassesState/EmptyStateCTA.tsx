import BaseButton from "@/components/base/BaseButton"

export default function EmptyStateCTA() {
  return (
    <BaseButton
      variant="primary"
      typeStyle={{ base: "outline", lg: "default" }}
      className="w-auto"
    >
      Contact my tutor
    </BaseButton>
  )
}