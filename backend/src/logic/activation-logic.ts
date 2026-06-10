import { scheduledJobs } from "../scheduledJobs";
import cron from "node-cron";
import { db } from "../db";


// function to create a new cron job
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