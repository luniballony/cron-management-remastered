import { useEffect } from "react";
import CronJobCard from "../components/CronJobCard";
import type { jobType } from "../hooks/useJobs";
import useJobs from "../hooks/useJobs";


function ViewAll () {

    const {jobs, fetchJobs, handleDelete} = useJobs();

    useEffect(() => {
        fetchJobs();
    }, [])

    function activateAllJobs () {
        console.log("Started activation of all jobs.")
        fetch(`http://localhost:3000/activate-all`)
            .then(res => {
                console.log(res);
                console.log("Re-render")
                fetchJobs();
            })
    }

    return (
        <div
            
        >You're viewing ALLL the jobs
            <button 
                onClick={activateAllJobs}
                className="bg-gray-200
                            cursor-pointer">
                    Activate All Jobs</button>
            {   
                jobs?.map((item : jobType) => (
                    <CronJobCard 
                        key = {item.id} 
                        job = {item} 
                        onDelete = {handleDelete} 
                        onStatusChange = {fetchJobs}
                    />
                ))
            }
        </div>
    )
}


export default ViewAll;