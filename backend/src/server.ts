import dotenv from "dotenv";
import express from "express";
import cron from "node-cron";
import cors from "cors";
import {bd} from "./db";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is the Cron Management Remastered Backend.")
})

app.get("/cron-job", async(req, res) => {
  try{
    const result = await bd.query(
      "SELECT * FROM cron_job");

      res.json(result.rows);
      console.log("Connected to cron job table")
    } catch(err) {
      console.error(err);
      res.status(500).json({error : "Unable to connect to Cron-Job table"})
    }
})


// allows to view a cron
app.get("/view/:id", (req, res) => {
  const cronId = req.params.id;
  res.send(`This is Cron Job with id: ${cronId} page`);
})


// cron job template
// cron.schedule("* * * * *", async () => {
//     console.log("Runs every minute");
// });


// function to create a new job
function createJob (id : number, schedule : string) {
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
async function addJob (uri : string, method : string, schedule : string, timezone : string, body? : string) {
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


addJob('https://bazaar-genie.netlify.app/', 'GET', '*/5 * * * * *', 'NULL-TEST');

app.listen(3000);




