import { useEffect, useState } from "react";
import CronJobCard from "../components/CronJobCard";
import type { jobType }  from "../hooks/useJobs";
import { useParams } from "react-router";
import useJobs from "../hooks/useJobs"


function View () {

    const {id} = useParams<{id : string}>();
    // const [job, setJob] = useState<jobType | null>(null);

    // useEffect(() => {
    //     fetch(`http://localhost:3000/view/${id}`)
    //         .then(res => res.json())
    //         .then(data => 
    //             setJob(data)
    //         )
    // }, [id])

    const {job, fetchUniqueJob, handleDelete } = useJobs();

    useEffect (() => {
        if (id) fetchUniqueJob(Number(id));
    }, [id])
    
    if(!job || !job.id) {
        console.log(`Oh no, we couldnt retrieve job with id ${id}`);
        return <>Oh no, we couldnt locate this job in the database.</>;
    }

    return (
        <>{`You're viewing job with the id: ${job.id}`}
            <CronJobCard key = {job.id} job={job} onDelete={handleDelete} />
        </>
    )
}


export default View;