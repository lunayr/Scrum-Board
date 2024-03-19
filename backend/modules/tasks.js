import { generateUID } from "../lib/utils.js";
import { readDatabase, writeDatabase } from "./db.js";

// RULES to define constants for task status & category
const STATUS = { "to do": "To Do", "in progress": "In Progress", done: "Done" };
const CATEGORY = { ux: "UX", backend: "Back-end", frontend: "Front-end" };

// retrieve all tasks from db.js
async function getTasks() {
  return await readDatabase();
}

//  retrieve specific task by its ID
async function getTask(id) {
  const tasks = getTasks();
  return tasks[id];
}

// Add New Task to db.json
async function addTask(task) {
  const { title, category } = task;
  if (!title || !category) {
    throw { message: "Wrong data" };
  }
  //CHECK CATEGORY VALIDITY
  if (category && !CATEGORY[category.toLowerCase()])
    throw { message: "Wrong data: category" };

  let id = generateUID();
  const newTask = { title, category, status: "To Do", assigned: "", id };
  const tasks = await getTasks();
  tasks[id] = newTask;
  await writeDatabase(tasks);
  return tasks[id];
}

// UPDATE TASK IN THE DB.JSON
async function updateTask(id, task) {
  const { assigned, status } = task;
  if (!assigned && !status) {
    console.log("this");
    throw { message: "Wrong data", status: 400 };
  }
  //CHECK STATUS VALIDITY
  if (status && !STATUS[status.toLowerCase()])
    throw { message: "Incorrect status", status: 400 };

  const tasks = await getTasks();
  if (!tasks[id]) {
    console.log("that");
    throw { message: "Task doesn't exists", status: 404 };
  }

  let taskData = { ...tasks[id] };

  if (assigned) taskData = { ...taskData, assigned: assigned };
  if (status) taskData = { ...taskData, status: STATUS[status.toLowerCase()] };
  tasks[id] = taskData;

  await writeDatabase(tasks);
  return taskData;
}

// remove task with provided ID
async function removeTask(id) {
  const tasks = await getTasks();
  if (!tasks[id]) throw { message: "Task doesn't exists" };
  delete tasks[id];
  await writeDatabase(tasks);
  return id;
}

export { getTasks, getTask, addTask, removeTask, updateTask };
