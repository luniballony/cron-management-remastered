import cron from "node-cron";
import {db} from "./db";


// function to create a new singular job
export function createNewJob (id : number, schedule : string) {
  try {
    cron.schedule(schedule, async () => {
        console.log(`Cron Job ${id} - executed every ${schedule}`);
    });
  } catch (err) {
    console.error({error: "failed at creating a job.", err})
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
            console.log(`Starting job ${job.id}`)
            createNewJob(job.id, job.schedule);
        }

        console.log(`Activated ${result.rows.length} jobs`);
    } catch (err) {
        console.error({error: `Oh no, error at activating all j9bs: ${err}`});
    }
}