import { Search } from "lucide-react"

export default function SearchInput() {
    return (
        <div
            className="hidden lg:flex border border-white relative max-w-[700px] w-full h-[60px] justify-start items-center px-5 gap-x-3 overflow-hidden rounded-lg"
            style={{
            background:
                "linear-gradient(90.6deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.24) 100%)",
            backdropFilter: "blur(16px)",
            }}
        >

            <Search className="text-white"></Search>
            <input
                type="text"
                placeholder="Search"
                className="bg-transparent w-full appearance-none border-0 Z text-body-1 leading-[150%] text-white outline-none ring-0 placeholder:text-white/90"
            />
        </div>

    )
}
