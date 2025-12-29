import BaseButton from "@/components/base/BaseButton"
import Typography from "@/components/base/Typography"
export default function ViewAllBtn() { 
  return (
    <>
      {/* MOBILE */}
      <button className="lg:hidden">
        <Typography 
          variant={{ base: "label-2" }}
          color="electric-violet-600"
          underline
        >
          View all
        </Typography>

      </button>

      {/* DESKTOP */}
      <BaseButton variant="secondary" typeStyle="outline" className="hidden lg:flex">
        View all
      </BaseButton>
    </>
  )
}