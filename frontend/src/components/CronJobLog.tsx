import type { LogEntry } from "../hooks/useJobs";

function CronJobLog ({ log }: { log: LogEntry }) {
    return (
        <div className="
            text-grey text-[1.2rem] 
            mx-[0.5rem] mt-[0.5rem]
            flex 
        ">
            [{log.timestamp}] Job {log.jobId}:
            <p className='
                text-bright-yellow pl-[0.5rem]
            '>{log.message}</p>
        </div>
    )
}

export default CronJobLog