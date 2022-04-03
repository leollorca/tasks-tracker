const createButton = document.querySelector("#createTaskButton");
const createInput = document.querySelector("#taskTitleInput");
const tasksList = document.querySelector("#tasksList");
createButton.setAttribute("disabled", "");

createInput.addEventListener("keyup", onKeyUp);
createButton.addEventListener("click", createTask);
document.addEventListener("keyup", onKeyBackspaceUp);

function onKeyUp(event) {
  updateButtonDisability();
  onKeyEnterUp(event);
}

function updateButtonDisability() {
  const inputValue = createInput.value;
  if (inputValue) {
    createButton.removeAttribute("disabled");
  } else {
    createButton.setAttribute("disabled", "");
  }
}

function onKeyEnterUp(event) {
  const inputValue = createInput.value;
  if (inputValue.trim().length === 0) {
    createButton.setAttribute("disabled", "");
    return;
  } else if (event.code === "Enter") {
    createTask();
  }
}

function onKeyBackspaceUp(event) {
  if (event.target === createInput) {
    return;
  } else if (event.code === "Backspace") {
    tasksArray.pop();
    renderTasks();
  }
}

const tasksArray = [];

function createTask() {
  const inputValue = createInput.value;
  const task = {
    title: inputValue,
    date: new Date(),
    state: "undone",
  };
  tasksArray.push(task);
  createInput.value = "";
  createButton.setAttribute("disabled", "");
  renderTasks();
}

function deleteTask(index) {
  tasksArray.splice(index, 1);
}

function doneTask(task) {
  task.state = "done";
}

function undoneTask(task) {
  task.state = "undone";
}

function renderTasks() {
  tasksList.innerHTML = null;
  tasksArray.forEach(function (task, index) {
    const taskBox = document.createElement("div");
    const taskTitle = document.createElement("h2");
    const taskDate = document.createElement("h3");
    const deleteButton = document.createElement("button");
    const doneButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-danger");
    doneButton.classList.add("btn", "btn-primary");
    taskTitle.innerHTML = task.title;
    taskDate.innerHTML = task.date;
    deleteButton.innerHTML = "Delete";
    doneButton.innerHTML = "Done";
    tasksList.appendChild(taskBox);
    taskBox.appendChild(taskTitle);
    taskBox.appendChild(taskDate);
    taskBox.appendChild(deleteButton);
    taskBox.appendChild(doneButton);
    if (task.state === "undone") {
      taskTitle.style.textDecoration = "none";
    } else if (task.state === "done") {
      taskTitle.style.textDecoration = "line-through";
      doneButton.innerHTML = "Undone";
      doneButton.classList.replace("btn-primary", "btn-danger");
    }
    deleteButton.addEventListener("click", function () {
      deleteTask(index);
      renderTasks();
    });
    doneButton.addEventListener("click", function () {
      if (task.state === "undone") {
        doneTask(task);
      } else if (task.state === "done") {
        undoneTask(task);
      }
      renderTasks();
    });
  });
}
