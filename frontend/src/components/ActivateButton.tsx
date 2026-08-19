import type { jobType } from "../hooks/useJobs";

const ActivateButton = ({job, onStatusChange} : {job : jobType; onStatusChange: () => void }) => {


    if(!job || !job.id) {
        console.log(job.id);
        console.log(`Oh no, we couldnt retrieve job with id ${job.id} - button`);
        return <>Failed at Loading Button - activate</>;
    }

    function handleActivation () {
        console.log("started activation")
        fetch(`http://localhost:3000/activate/${job.id}`)
            .then(res => {
                console.log(res);
                onStatusChange(); // calls fetchJobs so it updates card in viewAll
            })
    }

    function handleDeActivation () {
        console.log("started deactivation")
        fetch(`http://localhost:3000/deactivate/${job.id}`)
            .then(res => {
                console.log(res);
                onStatusChange(); // calls fetchJobs so it updates card in viewAll
            })
    }

    return (
        <div className='
            cursor-pointer
            text-grey font-notable
        '>{
            job.is_active === false 
            ?
                <button onClick={handleActivation} className="
                    w-[14rem] h-[2rem]
                    bg-activated
                ">Activate</button>
            :  <button onClick={handleDeActivation} className="
                    w-[14rem] h-[2rem]
                    bg-deactivated
                ">De Activate</button>
        }            
        </div>
    )

}

export default ActivateButton