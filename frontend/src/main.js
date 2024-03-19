import { createTask, getTasks } from "./modules/tasks.js";
import { createTaskCard } from "./modules/ui.js";

const taskForm = $("#task-form");

async function displayTasks() {
  const tasks = await getTasks();
  Object.keys(tasks).forEach((id) => {
    let task = tasks[id];
    createTaskCard(task);
  });
}

taskForm.on("submit", createTask);
await displayTasks();
