import express from "express";
import cron from "node-cron";

const app = express();
app.listen(3000);

app.get("/", (req, res) => {
  res.send("This is the Cron Management Remastered Backend.")
})

// allows to view a cron
app.get("/view/:id", (req, res) => {
  const cronId = req.params.id;
  res.send(`This is Cron Job with id: ${cronId} page`);
})


cron.schedule("* * * * *", async () => {
    console.log("Runs every minute");
});

console.log("sup");
console.log("j");


