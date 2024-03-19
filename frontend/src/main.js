import { createTask, getTasks } from "./modules/tasks.js";
import { createTaskCard } from "./modules/ui.js";

const taskForm = $("#task-form");


// Display tasks fetched from an API
 
async function displayTasks() {
  const tasks = await getTasks();
  Object.keys(tasks).forEach((id) => {
    let task = tasks[id];
    createTaskCard(task);
  });
}

// Handles form submission for task creation
taskForm.on("submit", createTask);

// Display existing tasks
await displayTasks();
