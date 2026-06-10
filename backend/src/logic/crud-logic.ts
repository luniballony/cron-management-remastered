import { db } from "../db";
import { createNewJob } from "./activation-logic";



// funtion to add a new cron job, add to database and activate it
export async function addJob (uri : string, method : string, schedule : string, timezone : string, body? : string) {
  if (!body){
    const result = await db.query(
      "INSERT INTO cron_job (uri,http_method, schedule, timezone) VALUES ($1, $2, $3, $4)",
      [uri, method, schedule, timezone]);

    if(!result) {
      console.log("Error at adding a new job to the db");
    }}
    
  else {
    const result = await db.query(
    "INSERT INTO cron_job (uri,http_method, schedule, timezone, body) VALUES ($1, $2, $3, $4, $5)",
    [uri, method, schedule, timezone, body]);

    if(!result) {
      console.log("Error at adding a new job to the db");
    }
  }

  const id = 1;
  // activates job
  createNewJob(id, schedule);
  console.log("added new job to db")
}


// function to edit a job 
// currently updates all sections, even if they are the same
export async function editJob(id : number, uri? : string, httpMethod? : string, body? : string, schedule? : string, timezone? : string  ) {
    try {
        const result =  await db.query (
            "UPDATE cron_job SET uri = $2, http_method = $3, body = $4, schedule = $5, timezone = $6, updated_at = NOW() WHERE id = $1",
            [id, uri, httpMethod, body, schedule, timezone]
        );

        if (result.rowCount === 0) {
            console.log(`Couldnt edit job with id ${id}.`)
            return;
        }

        console.log(`Updated cron job with id ${id}`);
    } catch (err) {
        console.error({error: `Oh no, error while editing job with id: ${id} - ${err}`});
    }
}

export async function deleteJob (id : number) {
    try {
        const result = await db.query(
            "DELETE FROM cron_job WHERE id = $1",
            [id]
        );

        if (result.rowCount === 0) {
            console.log(`Couldnt delete job with id ${id} because it couldnt be found in the database`)
            return;
        } 
        
        console.log(`Deleted cron job with id: ${id}`);
        
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