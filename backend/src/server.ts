import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import {db} from "./db";
import { addJob, activateAllJob} from "./cron-logic";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is the Cron Management Remastered Backend.")
})

// gets all cron jobs from db
app.get("/cron-job", async(req, res) => {
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


// allows to view a cron
// not yet fully developed
app.get("/view/:id", (req, res) => {
  const cronId = req.params.id;
  res.send(`This is Cron Job with id: ${cronId} page`);
})


// cron job template
// cron.schedule("* * * * *", async () => {
//     console.log("Runs every minute");
// });


//addJob('https://bazaar-genie.netlify.app/', 'GET', '*/5 * * * * *', 'NULL-TEST');
activateAllJob();

app.listen(3000);




