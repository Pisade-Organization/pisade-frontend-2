import BaseButton from "@/components/base/BaseButton"
export default function ActionButtons() {
    return (
        <div className="flex flex-col justify-center items-center gap-[10px] w-full">
            <BaseButton className="w-full">Join class link</BaseButton>
            <BaseButton variant="secondary" typeStyle="outline" borderColor="white" textColor="white" className="w-full">Reschedule</BaseButton>
        </div>

    )
}