import { Search } from "lucide-react"

export default function SearchInput() {
    return (
        <div
            className="search-input-outline relative max-w-[700px] w-full h-[60px] flex justify-start items-center px-5 gap-x-3 rounded-lg"
            style={{
            background:
                "linear-gradient(90.6deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.24) 100%)",
            backdropFilter: "blur(16px)",
            }}
        >
            <Search className="text-white"></Search>
            <input type="text" placeholder="Search" className="w-full outline-none text-body-1 placeholder:text-white bg-transparent text-white" />
        </div>

    )
}