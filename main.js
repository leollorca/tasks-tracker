const createButton = document.querySelector("#createTaskButton");
const createInput = document.querySelector("#taskTitleInput");
const tasksList = document.querySelector("#tasksList");
createButton.setAttribute("disabled", "");

createInput.addEventListener("keyup", updateButtonDisability);

function updateButtonDisability() {
  const inputValue = createInput.value;
  if (inputValue) {
    createButton.removeAttribute("disabled");
  } else {
    createButton.setAttribute("disabled", "");
  }
}

createButton.addEventListener("click", createTask);

const tasksArray = [];

function createTask() {
  const inputValue = createInput.value;
  const task = {
    title: inputValue,
    date: new Date(),
  };
  tasksArray.push(task);
  renderTasks();
}

function renderTasks() {
  tasksList.innerHTML = null;
  tasksArray.forEach(function (task) {
    const taskBox = document.createElement("div");
    const taskTitle = document.createElement("h2");
    const taskDate = document.createElement("h3");
    taskTitle.innerHTML = task.title;
    taskDate.innerHTML = task.date;
    tasksList.appendChild(taskBox);
    taskBox.appendChild(taskTitle);
    taskBox.appendChild(taskDate);
  });
}
