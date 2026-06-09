import cron from "node-cron";
import {db} from "./db";


// function to create a new singular job
export function createNewJob (id : number, schedule : string) {
  try {
    console.log(`Starting job ${id}`)
    cron.schedule(schedule, async () => {
        console.log(`Cron Job ${id} - executed every ${schedule}`);
    });
  } catch (err) {
    console.error({error: `failed at creating a job with id ${id}`, err})
  }
}

// basic function to add job to db & to start it
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


// this function is called at the start of the server to activate all jobs 
// in the future make sure to only start those that are active.
export async function activateAllJob () {
    try {
        const result =  await db.query (
            "SELECT * FROM cron_job"
        );

        for (const job of result.rows) {
            createNewJob(job.id, job.schedule);
        }

        console.log(`Activated ${result.rows.length} jobs`);
    } catch (err) {
        console.error({error: `Oh no, error at activating all jobs: ${err}`});
    }
}


// function to edit a job 
// currently updates all sections, even if they are the same
export async function editJob(id : number, uri? : string, httpMethod? : string, body? : string, schedule? : string, timezone? : string  ) {
    try {
        const result =  await db.query (
            "UPDATE cron_job SET uri = $2, http_method = $3, body = $4, schedule = $5, timezone = $6, updated_at = NOW() WHERE id = $1",
            [id, uri, httpMethod, body, schedule, timezone]
        );

        console.log(`Updated cron job with id ${id}`);
    } catch (err) {
        console.error({error: `Oh no, error while editing job with id ${id}: ${err}`});
    }
}

