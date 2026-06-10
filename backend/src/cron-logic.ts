import cron from "node-cron";
import {db} from "./db";
import { scheduledJobs } from "./scheduledJobs"

// function to create a new singular job
export function createNewJob (id : number, schedule : string) {
  try {
    console.log(`Starting job ${id}`)

    if (scheduledJobs.has(id)) {
        console.log(`Job ${id} already active - reported at createnewjob`);
        return;
    }

    const task = cron.schedule(schedule, async () => {
        console.log(`Cron Job ${id} - executed every ${schedule}`);
    });

    scheduledJobs.set(id, task);   
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
            "SELECT * FROM cron_job WHERE is_active = 't'"
        );

        for (const job of result.rows) {
            createNewJob(Number(job.id), job.schedule);
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

// function to activate a job 
export async function activateJob(id: number) {
    
    if(scheduledJobs.has(id)) {
        console.log(`The cron job with id ${id} is already active - reported at activate job`);
        return;
    }

    try {
        const result =  await db.query (
            "UPDATE cron_job SET is_active = 't', updated_at = NOW() WHERE id = $1 RETURNING *",
            [id]
        );
        
        if (result.rowCount === 0) {
            console.log(`Couldnt change the state of the job with id ${id}.`)
            return;
        }

        createNewJob(id, result.rows[0].schedule);

        console.log(`Set job with id ${id} to active - reported at activate job`);
    } catch (err) {
        console.error({error : `Oh no, couldn't find job with id: ${id} - ${err}`})
    }
}


// function to stop a cron job
export async function deActivateJob(id : number) {
    if(!scheduledJobs.has(id)) {
        console.log(`No cron job with id ${id} found - reported at deActivateJob`);
        return;
    }
    
    try {
        const result =  await db.query (
            "UPDATE cron_job SET is_active = 'f', updated_at = NOW() WHERE id = $1 RETURNING *",
            [id]
        );
        
        if (result.rowCount === 0) {
            console.log(`Couldnt change the state of the job with id ${id}.`)
            return;
        }

        // stops the actual cron job
        const task = scheduledJobs.get(id);
        if(task) { 
            task.stop(); // pauses execution
            task.destroy(); // deletes it from memory
        }
        
        // removes from the map
        scheduledJobs.delete(id);
        console.log(`Set job with id ${id} to not active - reported at activate job`);
    } catch (err) {
        console.error({error : `Oh no, couldn't find job with id: ${id} - ${err}`})
    }
}