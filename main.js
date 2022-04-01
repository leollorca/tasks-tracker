const createButton = document.querySelector("#createTaskButton");
const createInput = document.querySelector("#taskTitleInput");
const tasksList = document.querySelector("#tasksList");
createButton.setAttribute("disabled", "");

createInput.addEventListener("keyup", onKeyUp);
createButton.addEventListener("click", createTask);

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
  if (event.code === "Enter") {
    createTask();
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
  renderTasks();
}

function deleteTask(index) {
  tasksArray.splice(index, 1);
}

function doneTask(task) {
  task.state = "done";
}

function renderTasks() {
  tasksList.innerHTML = null;
  tasksArray.forEach(function (task, index) {
    const taskBox = document.createElement("div");
    const taskTitle = document.createElement("h2");
    if (task.state === "done") {
      taskTitle.style.textDecoration = "line-through";
    }
    const taskDate = document.createElement("h3");
    const deleteButton = document.createElement("button");
    const doneButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-danger");
    doneButton.classList.add("btn", "btn-primary");
    taskTitle.innerHTML = task.title;
    taskDate.innerHTML = task.date;
    deleteButton.innerHTML = `Delete`;
    doneButton.innerHTML = `Done`;
    tasksList.appendChild(taskBox);
    taskBox.appendChild(taskTitle);
    taskBox.appendChild(taskDate);
    taskBox.appendChild(deleteButton);
    taskBox.appendChild(doneButton);
    deleteButton.addEventListener("click", function () {
      deleteTask(index);
      renderTasks();
    });
    doneButton.addEventListener("click", function () {
      doneTask(task);
      renderTasks();
    });
  });
}
