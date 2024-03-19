import { createTaskCard } from "./ui.js";

const headers = { "Content-Type": "application/json" };
const API_URI = "http://localhost:1453";

///////////////////////////
// CRUD OPERATIONS //
///////////////////////////


async function createTask(event) {
  event.preventDefault();
  const title = $("#task-title").val();
  const category = $("#task-category").val();
  const res = await fetch(API_URI + "/tasks", {
    method: "POST",
    body: JSON.stringify({ title, category }),
    headers,
  });
  const data = await res.json();
  createTaskCard(data);
}

async function assignTask(event) {
  event.preventDefault();
  const assigned = event.currentTarget.children[0].value;
  if (assigned === "") return;
  const id = event.currentTarget.children[1].value;
  const res = await fetch(API_URI + "/tasks/" + id, {
    method: "PATCH",
    body: JSON.stringify({ assigned, status: "In Progress" }),
    headers,
  });
  const data = await res.json();
  $("#task-" + id).remove();
  createTaskCard(data);
}

async function completeTask(event, id) {
  event.preventDefault();
  const res = await fetch(API_URI + "/tasks/" + id, {
    method: "PATCH",
    body: JSON.stringify({ status: "Done" }),
    headers,
  });
  const data = await res.json();
  $("#task-" + id).remove();
  createTaskCard(data);
}

async function deleteTask(event, id) {
  event.preventDefault();
  await fetch(API_URI + "/tasks/" + id, {
    method: "DELETE",
  });
  $("#task-" + id).remove();
}

async function getTasks() {
  const res = await fetch(API_URI + "/tasks");
  if (res.status === 200) {
    return await res.json();
  } else {
    return {};
  }
}   

export { createTask, assignTask, completeTask, deleteTask, getTasks };
