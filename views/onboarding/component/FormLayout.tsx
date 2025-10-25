export default function FormLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full flex flex-col justify-start items-center gap-1 bg-white rounded-[20px]">
      { children }
    </div>
  )
}