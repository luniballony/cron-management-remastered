import { useParams } from "react-router"
import { useEffect } from "react";
import { useForm } from "react-hook-form"
import useJobs from "../hooks/useJobs";

type JobFormData = {
    uri: string;
    body: string;
    schedule: string;
    method: string;
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
            method: `${job?.http_method}` ,
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
                method: job.http_method,
                timezone: job.timezone
            });
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
        <div>
            <div>{`Job ${id}`}</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    {...register('uri', 
                        {required : 'This field is required', 
                        minLength: {
                            value: 5,
                            message: 'You must enster a uri'
                        }})}
                    
                    placeholder="Uri"
                />

                <p>{errors.uri?.message}</p>

                <select {...register('method')} >                    
                    {methods.map((item) => (
                        <option key={item} value={item}>{item}</option>
                    ))}
                </select>

                <input 
                    {...register('body')}
                    placeholder="Body"
                />

                <input 
                    {...register('schedule', 
                        {required : 'This field is required', 
                        minLength: {
                            value: 5,
                            message: 'You must enster a schedule'
                        }})}
                    placeholder={job?.schedule}
                />

                <p>{errors.schedule?.message}</p>

                <input 
                    {...register('timezone', 
                        {required : 'This field is required', 
                        minLength: {
                            value: 1,
                            message: 'You must enster a timezone'
                        }})}
                    placeholder={job?.timezone}
                />

                <p>{errors.timezone?.message}</p>

                <button 
                    type="submit"
                    className="cursor-pointer
                                bg-blue-300
                                m-4 p-2 rounded-xl
                    ">Edit Job</button>
            </form>
        </div>
    )
}

export default EditJob