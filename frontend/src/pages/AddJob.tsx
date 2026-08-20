
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
        <div className="bg-grey py-[10rem]">
            <form onSubmit={handleSubmit(onSubmit)} className="
                bg-accent-blue [&>*]:p-[0.5rem]
                mx-[30rem] p-[0.6rem]
                flex flex-col 
                text-grey text-[1.2rem] font-notable
            ">
                <div className="flex w-full items-center">
                    <label className="
                        shrink-0
                    ">URI: </label>
                    <input
                    {...register('uri', 
                        {required : 'This field is required', 
                        minLength: {
                            value: 5,
                            message: 'You must enster a uri'
                        }})}
                    placeholder="Uri" className="
                        bg-dark-blue w-[90%] flex-1 pl-[0.5rem] ml-[0.5rem]
                    "/>
                </div>
                

                <p className="text-bright-yellow">{errors.uri?.message}</p>

                <div className="flex w-full items-center"> 
                    <label className="shrink-0">METHOD:</label>
                    <select {...register('method')} className="
                        bg-dark-blue w-40
                        text-center flex-1
                        ml-[0.5rem] py-[0.2rem]
                    ">
                        {methods.map((item) => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                    </select>
                </div>
                
                <div className="flex w-full items-center">
                    <label className="shrink-0">BODY:</label>
                    <input 
                    {...register('body')}
                    placeholder="Body" className="
                        bg-dark-blue w-100 flex-1 
                        pl-[0.5rem] ml-[0.5rem]
                    "/>
                </div>
                
                <div className="flex w-full items-center">
                    <label className="shrink-0">SCHEDULE: </label>
                    <input 
                    {...register('schedule', 
                        {required : 'This field is required', 
                        minLength: {
                            value: 5,
                            message: 'You must enster a schedule'
                        }})}
                    placeholder="Schedule" className="
                        bg-dark-blue w-100 flex-1 
                        pl-[0.5rem] ml-[0.5rem]
                    "/>
                </div>
                
                <p className="text-bright-yellow">{errors.schedule?.message}</p>

                <div className="flex w-full items-center">
                    <label className="shrink-0">TIMEZONE: </label>
                    <input 
                    {...register('timezone', 
                        {required : 'This field is required', 
                        minLength: {
                            value: 1,
                            message: 'You must enster a timezone'
                        }})}
                    placeholder="Timezone" className="
                        bg-dark-blue w-100 flex-1 
                        pl-[0.5rem] ml-[0.5rem] 
                    "/>
                </div>
                

                <p className="text-bright-yellow">{errors.timezone?.message}</p>

                <button type="submit" className="
                    cursor-pointer m-[0.5rem]
                    bg-bright-yellow 
                    text-black font-bold text-[1.6rem]
                ">Create New Job</button>
            </form>            
        </div>
    )
}


export default AddJob