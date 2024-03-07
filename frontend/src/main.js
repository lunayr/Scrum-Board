const API_URI = "http://localhost:1453";
const lanes = {
  "To Do": $("#lane-todo"),
  "In Progress": $("#lane-in-progress"),
  Done: $("#lane-done"),
};

const headers = { "Content-Type": "application/json" };

const taskForm = $("#task-form");

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
  const res = await fetch(API_URI + "/tasks/" + id, {
    method: "DELETE",
  });
  $("#task-" + id).remove();
}

function createTaskCard(task) {
  const card = $(
    `
    <div id="task-${task.id}"class='task'>
        <div class='category cat-${task.category}'></div>
        <div>${task.title}</div>
    </div>`
  );

  if (task.status === "To Do") {
    const assignForm = $(
      `<form>
        <sl-input size="small" required placeholder="Enter name to assign"></sl-input>
        <sl-input class="hidden" value="${task.id}"></sl-input>
        <sl-button size="small" type="submit">Assign</sl-button>
      </form>`
    );
    assignForm.on("submit", assignTask);
    card.append(assignForm);
  } else if (task.status === "In Progress") {
    const doneButton = $(
      `<sl-button size='small' outline>
            Done
        </sl-button>`
    );
    doneButton.on("click", (e) => completeTask(e, task.id));
    card.append(`<div>- ${task.assigned}</div>`, doneButton);
  } else if (task.status === "Done") {
    const removeButton = $(
      `<sl-button size='small' outline >
        <sl-icon slot="prefix" name="trash"></sl-icon>
        Delete
      </sl-button>`
    );
    removeButton.on("click", (e) => deleteTask(e, task.id));
    card.append(`<div>- ${task.assigned}</div>`, removeButton);
  }
  lanes[task.status].append(card);
}

async function getTasks() {
  const res = await fetch(API_URI + "/tasks");
  if (res.status === 200) {
    return await res.json();
  } else {
    return {};
    console.log(res.statusText);
  }
}

async function displayTasks() {
  const tasks = await getTasks();
  Object.keys(tasks).forEach((id) => {
    let task = tasks[id];
    createTaskCard(task);
  });
}

taskForm.on("submit", createTask);
await displayTasks();
