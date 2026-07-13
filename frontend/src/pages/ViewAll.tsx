import { useEffect, useState } from "react";
import CronJobCard from "../components/CronJobCard";
import type { jobType } from "../hooks/useJobs";
import useJobs from "../hooks/useJobs";


function ViewAll () {

    // const [jobs, setJobs] = useState<jobType[] | null>(null);

    // useEffect(() => {
    //     fetch(`http://localhost:3000/view-all`)
    //         .then(res => res.json())
    //         .then(data => 
    //             setJobs(data)
    //         )
    // }, [])


    // async function handleDelete(id :number) {        
    //     try {
    //         const res = await fetch(`http://localhost:3000/delete/${id}`, { method: "DELETE" })
    //         if (!res.ok) {
    //             console.log(`there was an error trying to delete job with id: ${id}`);
    //             return;
    //         }

    //         setJobs(prev => prev.filter(job => job.id !== id));
    //     } catch (err) {
    //         console.error({error: `Oh no, there was an error trying to delete something - ${err}`})
    //     }
    // }

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