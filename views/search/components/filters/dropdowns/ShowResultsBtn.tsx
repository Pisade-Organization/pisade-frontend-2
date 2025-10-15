

export default function ShowResultsBtn({
    onClick
}: {
    onClick?: any
}) {
    return (
        <button
        onClick={onClick}
        className="w-full py-3 px-4 text-center text-white bg-electric-violet-500 rounded-[8px]"
        >
            Show results
        </button>
    )
}