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


cron.schedule("* * * * *", async () => {
    console.log("Runs every minute");
});


app.listen(3000);




