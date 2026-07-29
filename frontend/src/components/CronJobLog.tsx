import type { LogEntry } from "../hooks/useJobs";

function CronJobLog ({ log }: { log: LogEntry }) {
    return (
        <p>
            [{log.timestamp}] Job {log.jobId}: {log.message}
        </p>
    )
}

export default CronJobLog