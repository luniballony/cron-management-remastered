import { useEffect, useState } from "react";
import CronJobCard from "../components/CronJobCard";

export type jobType = {
    id : number,
    uri : string,
    httpMethod : string,
    body? : string,
    schedule : string,
    isActive : boolean,
    createdAt : string,
    updatedAt : string
}

function ViewAll () {

    const [jobs, setJobs] = useState<jobType[] | null>(null);

    useEffect(() => {
        fetch(`http://localhost:3000/view-all`)
            .then(res => res.json())
            .then(data => 
                setJobs(data)
            )
    }, [])

    return (
        <>You're viewing ALLL the jobs
            {
                jobs?.map((item : jobType) => (
                    <CronJobCard key = {item.id} job={item} />
                ))
            }
        </>
    )
}


export default ViewAll;