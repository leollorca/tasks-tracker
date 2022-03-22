console.log("Welcome on Tasks tracker codebase !");

const UI = {
  taskTitleInput: document.querySelector("#taskTitleInput"),
  createTaskButton: document.querySelector("#createTaskButton"),
  tasksList: document.querySelector("#tasksList"),
};

const tasks = [];

init();

function init() {
  UI.createTaskButton.addEventListener("click", onCreateTask);
}

function onCreateTask() {
  const taskTitleInput = UI.taskTitleInput.value;
  if (!taskTitleInput) {
    return;
  }
  const task = createTask(taskTitleInput);
  tasks.push(task);
  updateTasksList();
}

function createTask(title) {
  return {
    title,
    creationDate: new Date(),
  };
}

function renderTasksList() {
  if (!tasks.length) {
    return null;
  }
  const listElement = document.createElement("ul");
  tasks.forEach((task) => {
    const taskElement = document.createElement("li");

    const titleElement = document.createElement("h3");
    titleElement.innerHTML = task.title;
    taskElement.appendChild(titleElement);

    const dateElement = document.createElement("p");
    dateElement.innerHTML = task.creationDate.toDateString();
    taskElement.appendChild(dateElement);

    listElement.appendChild(taskElement);
  });
  return listElement;
}

function renderElement(tag, content) {
  const element = document.createElement(tag);
  element.innerHTML = content;
  return element;
}

function updateTasksList() {
  UI.tasksList.innerHTML = renderTasksList().innerHTML;
}
