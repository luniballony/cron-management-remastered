import { db } from "../db";
import { scheduledJobs } from "../scheduledJobs";
import { activateJob, deActivateJob, jobCreation } from "./activation-logic";


// funtion to add a new cron job, add to database and activate it
export async function addJob (uri : string, method : string, schedule : string, timezone : string, body? : string) {
  if (!body){
    const result = await db.query(
      "INSERT INTO cron_job (uri,http_method, schedule, timezone) VALUES ($1, $2, $3, $4) RETURNING *",
      [uri, method, schedule, timezone]);

    if(!result) {
      console.log(`Error at adding a new job to the database`);
    }

    jobCreation(result.rows[0].id);
}
    
  else {
    const result = await db.query(
    "INSERT INTO cron_job (uri,http_method, schedule, timezone, body) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [uri, method, schedule, timezone, body]);

    if(!result) {
      console.log("Error at adding a new job to the db");
    }

    jobCreation(result.rows[0].id);
  }
  console.log(`Added a new job to the database`)
}


// function to edit a job 
// currently updates all sections, even if they are the same
export async function editJob(id : number, uri? : string, httpMethod? : string, body? : string, schedule? : string, timezone? : string  ) {
    // first deactivate job if its active
    if (scheduledJobs.has(id)) deActivateJob(id);
        
    try {
        const result =  await db.query (
            "UPDATE cron_job SET uri = $2, http_method = $3, body = $4, schedule = $5, timezone = $6, updated_at = NOW() WHERE id = $1 RETURNING *",
            [id, uri, httpMethod, body, schedule, timezone]
        );

        if (result.rowCount === 0) {
            console.log(`Couldnt edit job with id ${id}.`)
            return;
        }

        // activate after being edited job 
        activateJob(id);
        console.log(`Updated cron job with id ${id}`);
    } catch (err) {
        console.error({error: `Oh no, error while editing job with id: ${id} - ${err}`});
    }
}

export async function deleteJob (id : number) {
    try {
        // important to deactive before deleting it
        if(!await deActivateJob(id)) {
            console.log(`Aborting deletion of job ${id} - deactivation failed`);
            return false;
        }

        const result = await db.query(
            "DELETE FROM cron_job WHERE id = $1",
            [id]
        );

        if (result.rowCount === 0) {
            console.log(`Couldnt delete job with id ${id} because it couldnt be found in the database`)
            return false;
        } 

        console.log(`Deleted cron job with id: ${id}`);
        return true;
    } catch(err) {
        console.error({error: `Error at deleting job with id: ${id} - ${err}`})
    }
}


// function to fetch specific job
export async function searchJob(id : number) {
    try {
        const result =  await db.query(
            "SELECT * FROM cron_job WHERE id = $1",
            [id]
        )
        if(result.rows.length === 0) {
            console.log(`Couldnt find job with id: ${id}`);
            return;
        } 

        return(result.rows[0]);
    } catch (err) {
        console.error({error : `Error at finding cron job with id: ${id} - ${err}`})
    }
}