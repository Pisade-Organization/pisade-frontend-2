import BaseButton from "@/components/base/BaseButton"
export default function ActionButtons() {
    return (
        <div className="flex flex-col justify-center items-center gap-[10px]">
            <BaseButton>Join class link</BaseButton>
            <BaseButton variant="secondary" typeStyle="outline">Reschedule</BaseButton>
        </div>

    )
}