export default function EmptyState({ message }: { message: string }) {
  return (
    <section className="rounded-[28px] border border-white/70 bg-white p-6 shadow-[0_18px_50px_rgba(87,72,162,0.08)] lg:p-8">
      <div className="flex min-h-[320px] flex-col items-center justify-center rounded-[24px] border border-dashed border-[#E6E2F5] bg-[linear-gradient(180deg,#fbfbff_0%,#f4f2fb_100%)] px-6 text-center">
        <div className="mb-3 rounded-full bg-[#F0ECFF] px-4 py-2 text-sm font-semibold text-[#5F43EA]">Schedule is clear</div>
        <h3 className="text-xl font-semibold text-neutral-900">No classes in this range</h3>
        <p className="mt-2 max-w-md text-sm text-neutral-500">{message}</p>
      </div>
    </section>
  )
}
