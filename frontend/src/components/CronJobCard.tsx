import type { jobType }  from "../hooks/useJobs";

const CronJobCard = ({job, onDelete} : {job : jobType; onDelete: (id : number) => void }) => {

    return (
        <div className="bg-blue-200
                    m-4 p-2 rounded-xl">
        <li>
            <a href={`/view/${job.id}`}>
                <div className="">
                    <div className="flex justify-between">
                        <p>Job' ID: {job.id}</p>
                        <div className="flex
                        ">State: 
                            {(job.is_active == true) 
                                ? <p className="bg-green-300 rounded-md px-2 ml-1"
                                > Active</p>
                                : <p className="bg-red-300 rounded-md px-2 ml-1"
                                > Not Active</p>
                            } 
                        </div>
                    </div>
                </div>
                <p>URI: {job.uri}</p>
            </a>
        </li>
            <p>Method: {job.httpMethod}</p>
            <p>Body: {job.body? job.body : `This job has no body declared.`}</p>
            <p>Schedule: {job.schedule}</p>
            <p>Created at: {job.created_at}</p>
            
            <button onClick={() => onDelete(job.id)}
                className="
                    cursor-pointer
                    bg-blue-500
                ">Delete</button>
        </div>
    )
}


export default CronJobCard;