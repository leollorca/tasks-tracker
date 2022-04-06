const darkModeButton = document.querySelector("#darkModeButton");
let darkMode = window.localStorage.getItem("darkMode");

function enableDarkMode() {
  darkMode = "enabled";
  document.body.style.backgroundColor = "black";
  document.body.style.color = "white";
  darkModeButton.classList.replace("btn-primary", "btn-danger");
  darkModeButton.innerHTML = "Light mode";
  window.localStorage.setItem("darkMode", "enabled");
}

function disableDarkMode() {
  darkMode = "disabled";
  document.body.style.backgroundColor = "white";
  document.body.style.color = "black";
  darkModeButton.classList.replace("btn-danger", "btn-primary");
  darkModeButton.innerHTML = "Dark mode";
  window.localStorage.setItem("darkMode", "disabled");
}

darkModeButton.addEventListener("click", function () {
  if (darkMode === "disabled") {
    enableDarkMode();
    createInput.focus();
  } else {
    disableDarkMode();
    createInput.focus();
  }
});

if (darkMode === "enabled") {
  enableDarkMode();
}

const createButton = document.querySelector("#createTaskButton");
const createInput = document.querySelector("#taskTitleInput");
const tasksList = document.querySelector("#tasksList");
createButton.setAttribute("disabled", "");
createInput.focus();

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
    syncLocalStorage();
    renderTasks();
  }
}

const tasksArray = JSON.parse(window.localStorage.getItem("tasks")) || [];
renderTasks();

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
  syncLocalStorage();
}

function deleteTask(index) {
  tasksArray.splice(index, 1);
  syncLocalStorage();
}

function syncLocalStorage() {
  window.localStorage.setItem("tasks", JSON.stringify(tasksArray));
}

function doneTask(task) {
  task.state = "done";
  syncLocalStorage();
}

function undoneTask(task) {
  task.state = "undone";
  syncLocalStorage();
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
