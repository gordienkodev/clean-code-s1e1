//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const taskInput = document.getElementById('new-task');
const addButton = document.getElementsByTagName('button')[0];
const todoList = document.getElementById('incompleteTasks');
const completedList = document.getElementById('completed-tasks');

const createCheckbox = function () {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  return checkbox;
};

const createTaskLabel = function (taskText) {
  const taskLabel = document.createElement('label');
  taskLabel.innerText = taskText;
  taskLabel.className = 'task';
  return taskLabel;
};

const createEditInput = function () {
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'task';
  return editInput;
};

const createEditButton = function () {
  const editButton = document.createElement('button');
  editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.
  editButton.className = 'edit';
  return editButton;
};

const createDeleteButton = function () {
  const deleteButton = document.createElement('button');
  const deleteIcon = document.createElement('img');
  deleteButton.className = 'delete';
  deleteIcon.src = './remove.svg';
  deleteButton.appendChild(deleteIcon);
  return deleteButton;
};

const createTask = function (taskText) {
  const taskItem = document.createElement('li');

  taskItem.append(
    createCheckbox(),
    createTaskLabel(taskText),
    createEditInput(),
    createEditButton(),
    createDeleteButton(),
  );

  return taskItem;
};

const addTask = function () {
  const taskText = taskInput.value.trim();
  if (!taskText) return;
  const taskItem = createTask(taskText);

  todoList.appendChild(taskItem);
  bindTaskEvents(taskItem);

  taskInput.value = '';
};

const editTask = function () {
  const taskItem = this.parentNode;

  const editInput = taskItem.querySelector('input[type=text]');
  const taskLabel = taskItem.querySelector('label');
  const editButton = taskItem.querySelector('.edit');
  const isEditing = taskItem.classList.contains('editMode');
  if (isEditing) {
    taskLabel.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = taskLabel.innerText;
    editButton.innerText = 'Save';
  }

  taskItem.classList.toggle('editMode');
};

const deleteTask = function () {
  const taskItem = this.parentNode;
  const taskList = taskItem.parentNode;
  taskList.removeChild(taskItem);
};

const moveTask = function () {
  const taskItem = this.parentNode;
  const taskList = this.checked ? completedList : todoList;
  taskList.appendChild(taskItem);
};

addButton.addEventListener('click', addTask);

const bindTaskEvents = function (taskItem) {
  const checkbox = taskItem.querySelector('input[type=checkbox]');
  const editButton = taskItem.querySelector('button.edit');
  const deleteButton = taskItem.querySelector('button.delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkbox.onchange = moveTask;
};

for (const taskList of [todoList, completedList]) {
  for (const taskItem of taskList.children) {
    bindTaskEvents(taskItem);
  }
}
// Issues with usability don't get seen until they are in front of a human tester.
