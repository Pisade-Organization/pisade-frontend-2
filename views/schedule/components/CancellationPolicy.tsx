import Typography from "@/components/base/Typography"

export default function CancellationPolicy() {
  return (
    <div className="border border-neutral-50 bg-white p-4 flex flex-col gap-2 rounded-b-xl">
      <Typography variant="title-2" color="neutral-900">Cancellation Policy</Typography>
      <Typography variant="body-3" color="neutral-600">
        Lorem ipsum dolor sit amet, <br/>
        consectetur adipiscing elit.
      </Typography>
      <Typography variant="body-3" color="neutral-600">
        Lorem ipsum dolor sit amet,<br/>
        consectetur adipiscing elit.<br/>
        Sed do eiusmod tempor incididunt ut labore<br/>
        et dolore magna aliqua.
      </Typography>
    </div>
  )
}