import express from "express";
import * as tasks from "./modules/tasks.js";
import cors from "cors";

const app = express();
app.use(express.json(), cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/tasks", (req, res) => {
  tasks.getTasks().then((tasks) => res.json(tasks));
});

app.post("/tasks", (req, res) => {
  console.log(req.body);
  tasks
    .addTask(req.body)
    .then((task) => res.json(task))
    .catch((error) => {
      res.status(405);
      res.json(error.message);
    });
});

app.patch("/tasks/:id", (req, res) => {
  tasks
    .updateTask(req.params.id, req.body)
    .then((task) => res.json(task))
    .catch((error) => {
      console.log(error)
      res.status(error.status);
      res.json(error.message);
    });
});

app.delete("/tasks/:id", (req, res) => {
  tasks
    .removeTask(req.params.id)
    .then((id) => res.json({ id }))
    .catch((error) => {
      res.status(404);
      res.json(error.message);
    });
});

app.listen(1453, () => {
  console.log("Listening on port", 1453);
});
