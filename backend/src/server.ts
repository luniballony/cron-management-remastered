import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import {db} from "./db";
import { activateAllJob, activateJob, deActivateJob } from "./logic/activation-logic";
import { deleteJob, searchJob, addJob, editJob } from "./logic/crud-logic";
import { logList } from "./scheduledJobs";

dotenv.config();

export const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is the Cron Management Remastered Backend.")
})

// gets all cron jobs from db
app.get("/view-all", async(req, res) => {
  try{
    const result = await db.query(
      "SELECT * FROM cron_job ORDER BY is_active, id");

      res.json(result.rows);
      //console.log("Connected to cron job table")
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
  //createNewJob(cronId, result.schedule);
  return res.json(result);
})

app.post("/addjob", async (req, res) => {
  const {uri, body, schedule, method, timezone } = req.body;

  const newJob = await addJob(uri, method, schedule, timezone, body);

  return res.status(201).json(newJob);
});

app.delete("/delete/:id", async (req, res) =>{
  const id = Number(req.params.id)
  const deleted = await deleteJob(id);

  if(!deleted) {
    return res.status(404).json({ error: `Job ${id} not found` });
  }
  
  return res.status(200).json({ message: `Job ${id} deleted successfully` });
})

app.put("/edit/:id", async (req, res) => {
  const id = Number(req.params.id)
  const {uri, body, schedule, http_method, timezone } = req.body;

  const editedJob = await editJob(id, uri, http_method, body, schedule, timezone);

  return res.status(200).json(editedJob);
})


app.get("/activate/:id", async(req, res) =>{
  const id = Number(req.params.id);

  const r = await activateJob(id);

  if (r) return res.status(200).send();
  else return res.status(500).send();
})

app.get("/deactivate/:id", async (req, res) => {
  const id = Number(req.params.id);

  const r = await deActivateJob(id);

  if (r) return res.status(200).send();
  else return res.status(500).send();
})


app.get("/activate-all", async (req, res) => {
  const r = await activateAllJob();

  if (r) return res.status(200).send();
  else return res.status(500).send();
})


// sends log messages
app.get("/logs/stream", async (req, res) => {
  // mandatory for Server-Sent Events (SSE)
  res.setHeader("Content-Type", "text/event-stream"); // specifies the SSE type of route
  res.setHeader("Cache-Control", "no-cache"); // tells browser to not keep cache of this 
  res.setHeader("Connection", "keep-alive"); // tells browser to keep route open

  // keep a reference to this connection so other code can push to it
  logList.add(res);

  req.on("close", () => {
    logList.delete(res); // removes res when tab's closed
  });
});


async function setServer () {
  await activateAllJob();  
  }

setServer()

app.listen(3000);




