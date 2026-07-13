import { useEffect } from "react";
import CronJobCard from "../components/CronJobCard";
import type { jobType } from "../hooks/useJobs";
import useJobs from "../hooks/useJobs";


function ViewAll () {

    const {jobs, fetchJobs, handleDelete} = useJobs();

    useEffect(() => {
        fetchJobs();
    }, [])

    return (
        <>You're viewing ALLL the jobs
            {   
                jobs?.map((item : jobType) => (
                    <CronJobCard key = {item.id} job={item} onDelete = {handleDelete}/>
                ))
            }
        </>
    )
}


export default ViewAll;