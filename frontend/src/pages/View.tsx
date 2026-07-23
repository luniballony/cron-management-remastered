import { useEffect, useState } from "react";
import CronJobCard from "../components/CronJobCard";
import { useParams } from "react-router";
import useJobs from "../hooks/useJobs"


type LogEntry = {
    jobId: number;
    message: string;
    timestamp: Date; 
};


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


    useEffect(() => {
        logs.map((log) => {
            console.log(log)
        });
    }, [logs])
    
    if(!job || !job.id) {
        console.log(`Oh no, we couldnt retrieve job with id ${id}`);
        return <>Oh no, we couldnt locate this job in the database.</>;
    }

    return (
        <>{`You're viewing job with the id: ${job.id}`}
            <CronJobCard key = {job.id} job={job} onDelete={handleDelete} onStatusChange={() => fetchUniqueJob(Number(id))}/>
            <a href={`/edit/${id}`} >Edit</a>
        </>
    )
}


export default View;