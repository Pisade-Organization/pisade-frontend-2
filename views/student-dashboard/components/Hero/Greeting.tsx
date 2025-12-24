export default function Greeting({
    studentName,
    todayLessonCounts
}: {
    studentName: string,
    todayLessonCounts: number
}) {
    return (
        <div className="flex flex-col justify-center items-center lg:items-start pb-3 gap-3">
            
            {/* TITLE */}
            <h1 className="text-white text-headline-3 lg:text-headline-1 text-center lg:text-left"> 
                Glad to see you, {studentName}
            </h1>

            {/* SUBTITLE */}
            <h2 className="text-white text-center lg:text-left text-body-3 lg:text-body-2">
                {todayLessonCounts > 0 &&
                    <>
                        <span>
                            You have {todayLessonCounts} sessions. It is a lot of work today!
                        </span>
                        <br />
                        <span>
                            So let's start 👏
                        </span>
                    </>
                }
            </h2>



        </div>
    )
}