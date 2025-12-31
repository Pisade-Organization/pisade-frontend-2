import Typography from "@/components/base/Typography";

interface InfoRowI {
  label: string;
  value: string;
}

export default function InfoRow({
  label, value
}: InfoRowI) {
  return (
    <div className="w-full flex flex-col items-start justify-start">
      <Typography variant={{ base: "body-4", lg: "body-3" }} color="neutral-400">
        { label }
      </Typography>

      <Typography variant={{ base: "label-3", lg: "label-2" }} color="neutral-800">
        { value }
      </Typography>
    </div>
  )
}