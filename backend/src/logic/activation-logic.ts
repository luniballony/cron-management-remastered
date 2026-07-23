import { scheduledJobs } from "../scheduledJobs";
import cron from "node-cron";
import { db } from "../db";
import { searchJob } from "./crud-logic";


// function to create a new cron job
export async function jobCreation (id : number ) {
  try {
    console.log(`Starting job ${id}`)

    if (scheduledJobs.has(id)) {
        console.log(`Job ${id} already active - reported at createnewjob`);
        return;
    }

    const data = await searchJob(id);

    if(!data) {
        console.log("Oh no, error at fetching cron data - reported at jobCreation");
    }

    const task = cron.schedule(data.schedule, async () => {
        try {
            const response = await fetch(data.uri, {
                method : data.http_method,
                ...(data.body != null && {
                    headers: { 'Content-Type': 'application/json' },
                    body : data.body, })
            });

            console.log(`Job ${id} completed - status: ${response.status}`);
        } catch (err) {
            console.error({error: `Oh no, there was an jobCreation ${id} - ${err}`})
        }
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
        return false;
    }

    try {
        const result =  await db.query (
            "UPDATE cron_job SET is_active = 't', updated_at = NOW() WHERE id = $1 RETURNING *",
            [id]
        );
        
        if (result.rowCount === 0) {
            console.log(`Couldnt change the state of the job with id ${id}.`)
            return false;
        }

        await jobCreation(id);
        console.log(`Set job with id ${id} to active - reported at activate job`);
        return true;
    } catch (err) {
        console.error({error : `Oh no, couldn't find job with id: ${id} - ${err}`})
        return false;
    }
}


export async function deActivateJob(id: number) {
    try {
        const result = await db.query(
            "UPDATE cron_job SET is_active = 'f', updated_at = NOW() WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rowCount === 0) {
            console.log(`Couldnt change the state of the job with id ${id}.`);
            return false;
        }

        // only stop/cleanup the in-memory task if it's actually scheduled
        const task = scheduledJobs.get(id);
        if (task) {
            task.stop();
            task.destroy();
            scheduledJobs.delete(id);
        }

        console.log(`Set job with id ${id} to not active - reported at deActivateJob`);
        return true;
    } catch (err) {
        console.error({ error: `Oh no, couldn't find job with id: ${id} - ${err}` });
        return false;
    }
}



// this function is called at the start of the server to activate all jobs 
export async function activateAllJob () {
    try {
        const result =  await db.query (
            "SELECT * FROM cron_job WHERE is_active = 'f'"
        );

        for (const job of result.rows) {
            await activateJob(job.id);
        }

        console.log(`Activated ${result.rows.length} jobs`);
        return true;
    } catch (err) {
        console.error({error: `Oh no, error at activating all jobs: ${err}`});
        return false;
    }
}



// this function is called to deactivate all jobs 
export async function deActivateAllJob () {
    try {
        const result =  await db.query (
            "UPDATE cron_job SET is_active = 'f', updated_at = NOW() WHERE is_active = 't' RETURNING *"
        );

        for (const job of result.rows) {
            await deActivateJob(job.id);
        }

        console.log(`Deactivated ${result.rows.length} jobs`);
    } catch (err) {
        console.error({error: `Oh no, error at deactivating all jobs: ${err}`});
    }
}
