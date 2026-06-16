import { useEffect, useState, Fragment } from "react";
import CronJobCard from "../components/cronJobCard";

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

// previous element, had to be removed since it can only pass 1
//<Fragment key = {item.id}>Job with : {item.id}</Fragment>
export default ViewAll;