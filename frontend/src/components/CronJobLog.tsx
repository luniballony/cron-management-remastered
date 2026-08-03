import type { LogEntry } from "../hooks/useJobs";

function CronJobLog ({ log }: { log: LogEntry }) {
    return (
        <div className="
            bg-gray-400 m-1 rounded-md
        ">
            [{log.timestamp}] Job {log.jobId}: {log.message}
        </div>
    )
}

export default CronJobLog