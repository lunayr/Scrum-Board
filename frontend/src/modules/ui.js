import { assignTask, completeTask, deleteTask } from "./tasks.js";

const lanes = {
  "To Do": $("#lane-todo"),
  "In Progress": $("#lane-in-progress"),
  Done: $("#lane-done"),
};

// Create task card based on its properties and status
function createTaskCard(task) {
  const card = $(
    // Create a new HTML element for the task card
    `
    <div id="task-${task.id}"class='task'>
        <div class='category cat-${task.category}'></div>
        <div>${task.title}</div>
    </div>`
  );

  // Check the status of the task and add appropriate elements based on status
  if (task.status === "To Do") {
    // Create a form for assigning the task if its in the "To Do" status
    const assignForm = $(
      `<form>
        <sl-input size="small" required placeholder="Enter name to assign"></sl-input>
        <sl-input class="hidden" value="${task.id}"></sl-input>
        <sl-button size="small" type="submit">Assign</sl-button>
      </form>`
    );

    // Event listener for the assign form
    assignForm.on("submit", assignTask);
    card.append(assignForm);
  } else if (task.status === "In Progress") {
    const doneButton = $(
      `<sl-button size='small' outline>
            Done
        </sl-button>`
    );

    // Event listener for the DONE BUTTON
    doneButton.on("click", (e) => completeTask(e, task.id));
    card.append(`<div>- ${task.assigned}</div>`, doneButton);
  } else if (task.status === "Done") {
    const removeButton = $(
      `<sl-button size='small' outline >
        <sl-icon slot="prefix" name="trash"></sl-icon>
        Delete
      </sl-button>`
    );

    // Event Listener for the REMOVE BUTTON
    removeButton.on("click", (e) => deleteTask(e, task.id));
    card.append(`<div>- ${task.assigned}</div>`, removeButton);
  }
  lanes[task.status].append(card);
}

export { createTaskCard };
