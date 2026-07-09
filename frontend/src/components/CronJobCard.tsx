import type { jobType } from "../pages/ViewAll";

const CronJobCard = ({job} : {job : jobType}) => {
    return (
        
        <li className="">
            <a href={`/view/${job.id}`}>
                <div className="
                    bg-blue-200
                    m-4 p-2 rounded-xl
                ">
                    
                    <div className="flex justify-between">
                        <p>Job' ID: {job.id}</p>
                        <p className="flex
                        ">State: 
                            {(job.isActive == true) 
                                ? <p className="bg-green-300"
                                > Active</p>
                                : <p className="bg-red-300
                                    rounded-md px-2 ml-1
                        "> Not Active</p>
                            } 
                        </p>
                    </div>
                    <p>URI: {job.uri}</p>
                    <p>Method: {job.httpMethod}</p>
                    <p>Body: {job.body? job.body : `This job has no body declared.`}</p>
                    <p>Schedule: {job.schedule}</p>
                    <p>Created at: {job.createdAt}</p>
                    
                </div>
            </a>
        </li>
    )
}


export default CronJobCard;