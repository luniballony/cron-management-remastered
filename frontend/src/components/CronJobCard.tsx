import type { jobType } from "../pages/ViewAll";

const CronJobCard = ({job} : {job : jobType}) => {
    return (
        <div>
            <>Job with id: {job.id}</>
            <>URI: {job.uri}</>
            <>METHOD: {job.httpMethod}</>
            <>BODY: {job.body? job.body : `This job has no body declared`}</>
            <>Schedule: {job.schedule}</>
            <>State: {(job.isActive == true) ? `Active - ${job.isActive}` : `Not Active - ${job.isActive}`}</>
        </div>
    )
}


export default CronJobCard;