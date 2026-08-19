import { useEffect, useState } from "react";
import CronJobCard from "../components/CronJobCard";
import { useParams } from "react-router";
import useJobs from "../hooks/useJobs"
import CronJobLog from "../components/CronJobLog";
import type { LogEntry } from "../hooks/useJobs";


function View () {

    const [logs, setLogs] = useState<LogEntry[]>([]);

    const {id} = useParams<{id : string}>();
    const {job, fetchUniqueJob, handleDelete } = useJobs();

    useEffect (() => {
        if (id) fetchUniqueJob(Number(id));
    }, [id])


    // gets logs
    useEffect(() => {
        const eventSource = new EventSource("http://localhost:3000/logs/stream");

        eventSource.onmessage = (event) => {
            const log = JSON.parse(event.data);
            setLogs( prev => [...prev, log]);
        }

        return () => eventSource.close();
    }, []);

    
    if(!job || !job.id) {
        console.log(`Oh no, we couldnt retrieve job with id ${id}`);
        return <>Oh no, we couldnt locate this job in the database.</>;
    }

    return (
        <div className='bg-grey flex flex-col'>
            <div className='
                mx-[24rem]
            '>
                <CronJobCard key = {job.id} job={job} onDelete={handleDelete} onStatusChange={() => fetchUniqueJob(Number(id))}/>
                
                <div className="
                    bg-dark-blue my-4 overflow-y-auto h-100
                ">
                {
                    job.is_active === false ?
                    <p className='
                        font-bold text-[2rem] font-notable text-center
                    '>This job ins't active.</p>
                    : 
                    logs
                        .filter((log) => 
                            log.jobId === job.id
                        )
                        .map((log, index) => (
                        <CronJobLog key={index} log = {log} />
                    ))
                }
                </div>
            </div>
        </div>
    )
}


export default View;