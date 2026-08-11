
import { useForm } from "react-hook-form"

type JobFormData = {
    uri: string;
    body: string;
    schedule: string;
    method: string;
    timezone: string;
};

function AddJob () {

    const {
        register,
        handleSubmit,
        formState: { errors }
     } = useForm<JobFormData>({
        defaultValues: {
            timezone: "GMT+1"
        }
     });

    const methods = ['GET', 'PUT', 'DELETE', 'PATCH'];

    console.log(errors)

    function onSubmit (data : JobFormData) {
        
        fetch("http://localhost:3000/addjob", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (res.status === 201) {
                    alert(`Job created`);
                } else {
                    alert("Something went wrong.");
                }
            })
    }

    return(
        <div>
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
                    placeholder="Schedule"
                />

                <p>{errors.schedule?.message}</p>

                <input 
                    {...register('timezone', 
                        {required : 'This field is required', 
                        minLength: {
                            value: 1,
                            message: 'You must enster a timezone'
                        }})}
                    placeholder="Timezone"
                />

                <p>{errors.timezone?.message}</p>

                <button type="submit">Create New Job</button>
            </form>            
        </div>
    )
}


export default AddJob