import { useParams } from "react-router"
import { useEffect } from "react";
import { useForm } from "react-hook-form"
import useJobs from "../hooks/useJobs";

type JobFormData = {
    uri: string;
    body: string;
    schedule: string;
    http_method: string;
    timezone: string;
};

function EditJob () {

    const { id } = useParams<{id : string}>();
    const {job, fetchUniqueJob } = useJobs();

    const methods = ['GET', 'PUT', 'DELETE', 'PATCH'];

    useEffect (() => {
        if (id) {
            fetchUniqueJob(Number(id));
        };
    }, [id])


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
     } = useForm<JobFormData>({
        defaultValues: {
            uri: `${job?.uri}`,
            body: `${job?.body}` ,
            schedule: `${job?.schedule}` ,
            http_method: `${job?.http_method}` ,
            timezone: "GMT+1"
        }
    });


    // allows to re-render component to get the correct values for the input
    useEffect(() => {
        if (job) {
            reset({
                uri: job.uri,
                body: job.body,
                schedule: job.schedule,
                http_method: job.http_method,
                timezone: job.timezone
            });

            console.log(job.http_method);
        }
    }, [job, reset]);

    function onSubmit (data : JobFormData){
        
        fetch(`http://localhost:3000/edit/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (res.status === 200) {
                    console.log(`Job edited`);
                } else {
                    console.log("Something went wrong.");
                }
            })
    }
    
    return (
        <div className='
            bg-grey
        '>
            <div className="
                py-[0.5rem]
                text-center text-[3rem] 
                font-bold font-notable
            ">{`Job ${id}`}</div>

            <form onSubmit={handleSubmit(onSubmit)} className='
                bg-accent-blue [&>*]:p-[0.5rem]
                mx-[30rem] p-[0.6rem]
                flex flex-col 
                text-grey text-[1.2rem] font-notable
            '>
                <div className="
                    flex w-full items-center
                ">
                    <label className="
                        shrink-0
                    ">URI:</label>
                    <input
                            {...register('uri', 
                                {required : 'This field is required!', 
                                minLength: {
                                    value: 5,
                                    message: 'You must enster an uri'
                                }})}
                            
                            placeholder={job?.uri}
                            className='bg-dark-blue w-[90%] flex-1 pl-[0.5rem] ml-[0.5rem]'
                        />
                </div>
                <p className="
                    text-bright-yellow
                ">{errors.uri?.message}</p>
                
                <div className="flex w-full items-center">
                    <label className='shrink-0' >METHOD: </label>
                    <select {...register('http_method')} className='
                            bg-dark-blue w-40
                            text-center flex-1
                            ml-[0.5rem] py-[0.2rem]
                        '>                    
                            {methods.map((item) => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>
                </div>
                
                <div className="flex w-full items-center">
                    <label className="shrink-0">BODY: </label>
                    <input  {...register('body')} placeholder="Insert body..." className='
                        bg-dark-blue w-100 flex-1 
                        pl-[0.5rem] ml-[0.5rem]
                    '/>
                </div>
                
                <div className="flex w-full items-center">
                    <label className="shrink-0"> SCHEDULE: </label>
                    <input 
                        {...register('schedule', 
                            {required : 'This field is required', 
                            minLength: {
                                value: 5,
                                message: 'You must enster a schedule'
                            }})}
                        placeholder={job?.schedule}
                        className='
                            bg-dark-blue w-100 flex-1 
                            pl-[0.5rem] ml-[0.5rem]
                    '/>
                </div>
                

                <p className="
                    text-bright-yellow
                ">{errors.schedule?.message}</p>
                
                <div className="flex w-full items-center">
                    <label className="
                        shrink-0
                    ">TIMEZONE: </label>
                    <input 
                        {...register('timezone', 
                            {required : 'This field is required', 
                            minLength: {
                                value: 1,
                                message: 'You must enster a timezone'
                            }})}
                        placeholder={job?.timezone}
                        className='bg-dark-blue w-100 flex-1 
                            pl-[0.5rem] ml-[0.5rem] 
                        '/>
                </div>

                <p className="
                    text-bright-yellow
                ">{errors.timezone?.message}</p>

                <button  type="submit" className="
                    cursor-pointer m-[0.5rem]
                    bg-bright-yellow 
                    text-black font-bold text-[1.6rem]
                ">Edit Job</button>
            </form>
        </div>
    )
}

export default EditJob