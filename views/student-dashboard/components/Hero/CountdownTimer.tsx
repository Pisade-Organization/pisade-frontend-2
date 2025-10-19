import TimerCard from "./TimerCard"
export default function CountdownTimer({
    lessonTime
}: {
    lessonTime: Date
}) {
    // Calculate the time left until lessonTime
    const now = new Date();
    const diff = lessonTime.getTime() - now.getTime();

    let hours = "00";
    let minutes = "00";
    let seconds = "00";

    if (diff > 0) {
        const totalSeconds = Math.floor(diff / 1000);
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;

        hours = h.toString().padStart(2, "0");
        minutes = m.toString().padStart(2, "0");
        seconds = s.toString().padStart(2, "0");
    }
    return (
        <div className="flex justify-center items-center gap-4">
            
            <TimerCard value={hours} label="Hours" />

            <div className="text-headline-3 text-white"> 
                :
            </div>

            <TimerCard value={minutes} label="Minutes" />

            <div className="text-headline-3 text-white"> 
                :
            </div>

            <TimerCard value={seconds} label="Secs" />
                



        </div>
    )
}