import { useState } from "react";

export type jobType = {
    id : number,
    uri : string,
    http_method : string,
    body? : string,
    schedule : string,
    timezone : string,
    is_active : boolean,
    created_at : string,
    updated_at : string
}

export type LogEntry = {
    jobId: number;
    message: string;
    timestamp: string; 
};

function useJobs() {
    const [jobs, setJobs] = useState<jobType[]>([]);
    const [job, setJob] = useState<jobType | null >(null);

    async function fetchJobs() {
        const res = await fetch(`http://localhost:3000/view-all`)
        const data = await res.json();
        setJobs(data);
    }

    async function fetchUniqueJob(id : number) {
        const res = await fetch(`http://localhost:3000/view/${id}`);
        const data = await res.json();
        setJob(data);
    }

    async function handleDelete(id :number) {        
        try {
            const res = await fetch(`http://localhost:3000/delete/${id}`, { method: "DELETE" })
            if (!res.ok) {
                console.log(`there was an error trying to delete job with id: ${id}`);
                return;
            }

            setJobs(prev => prev.filter(job => job.id !== id));
        } catch (err) {
            console.error({error: `Oh no, there was an error trying to delete something - ${err}`})
        }
    }

    return {jobs, job, fetchJobs, fetchUniqueJob, handleDelete};
}

export default useJobs;