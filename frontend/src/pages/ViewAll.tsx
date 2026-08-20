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
        <div className='
            bg-grey
            font-notable
            flex flex-col
        '>
            <p className='
                text-center
                pt-4
            '>You're viewing all the existing jobs</p>
            
            <div className="flex justify-center">
                <button onClick={activateAllJobs} className="
                    bg-accent-blue
                    text-grey font-notable text-[1.2rem]
                    cursor-pointer
                    h-[2rem] w-[10rem]
                "> Activate All Jobs </button>
            </div>
            

            <div className='
                mx-[30rem]
            '>
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
        </div>
    )
}


export default ViewAll;