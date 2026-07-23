import { useEffect } from "react";
import CronJobCard from "../components/CronJobCard";
import { useParams } from "react-router";
import useJobs from "../hooks/useJobs"


function View () {

    const {id} = useParams<{id : string}>();
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
            <CronJobCard key = {job.id} job={job} onDelete={handleDelete} onStatusChange={() => fetchUniqueJob(Number(id))}/>
            <a href={`/edit/${id}`} >Edit</a>
        </>
    )
}


export default View;