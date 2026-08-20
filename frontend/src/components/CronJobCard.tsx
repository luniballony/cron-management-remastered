import type { jobType }  from "../hooks/useJobs";
import ActivateButton from "./ActivateButton";

const CronJobCard = ({job, onDelete, onStatusChange} : {job : jobType; onDelete: (id : number) => void ; onStatusChange: () => void }) => {

    return (
        <div className="
            bg-light-blue
            my-4 px-[1rem] py-[0.5rem]
            text-black
        ">

            <li className="list-none">
                <a href={`/view/${job.id}`}>
                    <div className="">
                        <div className="flex justify-between">
                            <p className='
                                font-notable text-[1.8rem] text-accent-blue font-bold
                            '>Job ID: {job.id}</p>
                            <div className="
                                flex font-bold 
                                text-[1.4rem] text-bright-yellow
                            "> 
                                {(job.is_active == true) 
                                    ? <p> Active</p>
                                    : <p className='text-black'> Not Active</p>
                                } 
                            </div>
                        </div>
                    </div>                
                </a>
            </li>
            
            <div className='
                flex flex-col 
            '>
                <div className='
                    flex items-center
                '>
                    <p className='text-[1.4rem]'>URI:</p>
                    <p className='text-[1.2rem] pl-[0.5rem]'>{job.uri}</p>
                </div>
                
                <div className='flex items-center'>
                    <p className='text-[1.4rem]'>Method:</p>
                    <p className='text-[1.2rem] pl-[0.5rem]'>{job.http_method}</p>
                </div>

                <div className='flex items-center'>
                    <p className='text-[1.4rem]'>Body: </p>
                    <p className='text-[1.2rem] pl-[0.5rem]'>{job.body? job.body : `This job has no body declared.`}</p>
                </div>

                <div className='flex items-center'>
                    <p className='text-[1.4rem]'>Schedule:</p>
                    <p className='text-[1.2rem] pl-[0.5rem]'>{job.schedule}</p>
                </div>

                <div className='flex items-center'>
                    <p className='text-[1.4rem]'>Created at:</p>
                    <p className='text-[1.2rem] pl-[0.5rem]'>{job.created_at}</p>
                </div>

            </div>
                
            <div className='
                flex justify-evenly
            '>
                <ActivateButton key = {job.id} job = {job} onStatusChange={onStatusChange}/>

                <a href={`/edit/${job.id}`} className='
                    cursor-pointer
                    bg-accent-blue
                    px-[4rem] py-[0.2rem]
                    text-grey font-notable text-[1.2rem]
                '>Edit</a>

                <button onClick={() => onDelete(job.id)} className="
                        cursor-pointer
                        bg-accent-blue
                        px-[4rem] py-[0.2rem]
                        text-grey font-notable text-[1.2rem]
                ">Delete</button>

                

            </div>               
        </div>
    )
}


export default CronJobCard;