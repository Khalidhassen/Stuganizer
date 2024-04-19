let todo = JSON.parse(localStorage.getItem("todo")) || [];
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");

document.addEventListener("DOMContentLoaded", function () {
  addButton.addEventListener("click", addTask);
  todoInput.addEventListener("keydown", handleEnterKey);
  deleteButton.addEventListener("click", deleteAllTasks);
  displayTasks();
});

function addTask() {
  const newTask = todoInput.value.trim();
  if (newTask !== "") {
    todo.push({ text: newTask, disabled: false });
    saveToLocalStorage();
    todoInput.value = "";
    displayTasks();
  }
}

function handleEnterKey(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addTask();
  }
}

function displayTasks() {
  todoList.innerHTML = "";
  todo.forEach((item, index) => {
    const li = createTaskElement(item, index);
    todoList.appendChild(li);
  });
  todoCount.textContent = todo.length;
}

function createTaskElement(item, index) {
  const li = document.createElement("li");
  li.innerHTML = `
    <div class="todo-container">
      <input type="checkbox" class="todo-checkbox" id="input-${index}" ${item.disabled ? "checked" : ""}>
      <p id="todo-${index}" class="${item.disabled ? "disabled" : ""}">${item.text}</p>
    </div>
  `;
  li.querySelector(".todo-checkbox").addEventListener("change", () => toggleTask(index));
  li.addEventListener("click", (event) => {
    event.stopPropagation();
    const deleteConfirmation = confirm("Are you sure you want to delete this task?");
    if (deleteConfirmation) {
      deleteTask(index);
    }
  });
  return li;
}

function toggleTask(index) {
  todo[index].disabled = !todo[index].disabled;
  saveToLocalStorage();
  displayTasks();
}

function deleteTask(index) {
  todo.splice(index, 1);
  saveToLocalStorage();
  displayTasks();
}

function deleteAllTasks() {
  todo = [];
  saveToLocalStorage();
  displayTasks();
}

function saveToLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todo));
}