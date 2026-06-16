import type { jobType } from "../pages/ViewAll";

const CronJobCard = ({job} : {job : jobType}) => {
    return (
        <div>
            <>Job with id: {job.id}</>
        </div>
    )
}


export default CronJobCard;