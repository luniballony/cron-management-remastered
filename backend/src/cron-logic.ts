import cron from "node-cron";
import {bd} from "./db";


// function to create a new job
export function createJob (id : number, schedule : string) {
  console.log("entered createJob")
  try {
    cron.schedule(schedule, async () => {
        console.log(`Cron Job ${id} - executed every ${schedule}`);
    });
  } catch (err) {
    console.error({error: "failed at creating a job.", err})
  }
  //console.log("end of createJob function")
}

// basic function to add job to db & to start it
export async function addJob (uri : string, method : string, schedule : string, timezone : string, body? : string) {
  if (!body){
    const result = await bd.query(
      "INSERT INTO cron_job (uri,http_method, schedule, timezone) VALUES ($1, $2, $3, $4)",
      [uri, method, schedule, timezone]);

    if(!result) {
      console.log("Error at adding a new job to the db");
    }}
    
  else {
    const result = await bd.query(
    "INSERT INTO cron_job (uri,http_method, schedule, timezone, body) VALUES ($1, $2, $3, $4, $5)",
    [uri, method, schedule, timezone, body]);

    if(!result) {
      console.log("Error at adding a new job to the db");
    }
  }

  const id = 1;
  // activates job
  createJob(id, schedule);
  console.log("added new job to db")
}
