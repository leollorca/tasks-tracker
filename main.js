const createButton = document.querySelector("#createTaskButton");
const createInput = document.querySelector("#taskTitleInput");
const tasksList = document.querySelector("#tasksList");
createButton.setAttribute("disabled", "");

createInput.addEventListener("keyup", updateButtonDisability);
createButton.addEventListener("click", createTask);

function updateButtonDisability() {
  const inputValue = createInput.value;
  if (inputValue) {
    createButton.removeAttribute("disabled");
  } else {
    createButton.setAttribute("disabled", "");
  }
}

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

function deleteTask(index) {
  tasksArray.splice(index, 1);
}

function renderTasks() {
  tasksList.innerHTML = null;
  tasksArray.forEach(function (task, index) {
    const taskBox = document.createElement("div");
    const taskTitle = document.createElement("h2");
    const taskDate = document.createElement("h3");
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-danger");
    taskTitle.innerHTML = task.title;
    taskDate.innerHTML = task.date;
    deleteButton.innerHTML = `Delete`;
    tasksList.appendChild(taskBox);
    taskBox.appendChild(taskTitle);
    taskBox.appendChild(taskDate);
    taskBox.appendChild(deleteButton);
    deleteButton.addEventListener("click", function () {
      deleteTask(index);
      renderTasks();
    });
  });
}
