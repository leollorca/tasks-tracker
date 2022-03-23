const createButton = document.querySelector("#createTaskButton");
const createInput = document.querySelector("#taskTitleInput");
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

createButton.addEventListener("click", create);

function create() {
  const inputValue = createInput.value;
  const tasksList = document.querySelector("#tasksList");
  const task = {
    title: inputValue,
    date: new Date(),
  };
  console.log(task);
}
