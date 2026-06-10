import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import {db} from "./db";
import { addJob, activateAllJob, editJob, deleteJob, searchJob, createNewJob, activateJob, changeStateJob, deActivateJob} from "./cron-logic";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is the Cron Management Remastered Backend.")
})

// gets all cron jobs from db
app.get("/view-all", async(req, res) => {
  try{
    const result = await db.query(
      "SELECT * FROM cron_job");

      res.json(result.rows);
      console.log("Connected to cron job table")
    } catch(err) {
      console.error(err);
      res.status(500).json({error : "Unable to connect to Cron-Job table"})
    }
})


// view a specific cron
app.get("/view/:id", async (req, res) => {
  const cronId = parseInt(req.params.id, 10);

  if (isNaN(cronId)) {
    return res.status(400).json({
      error: "Invalid cron id"
    });
  }
  
  const result = await searchJob(cronId)
  
  if(!result) {
    return res.status(404).json({
      error: "couldnt find cron job with that id."
    })
  }
  createNewJob(cronId, result.schedule);
  return res.json(result);
})

// TESTING SEGMENT
// cron job template
// cron.schedule("* * * * *", async () => {
//     console.log("Runs every minute");
// });


//addJob('https://bazaar-genie.netlify.app/', 'GET', '*/5 * * * * *', 'NULL-TEST');
// activateAllJob();
//editJob(18, "http://www.stardoll.com", "POST", "NULL", "*/5 * * *", "NULL");
//changeStateJob(1, false) 


async function setServer () {
  await activateAllJob();
  await deActivateJob(1);
  await activateJob(4);
  
}

setServer()

app.listen(3000);




