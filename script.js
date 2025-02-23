// Get elements
let taskInput = document.getElementById("task-input");
let taskList = document.getElementById("task-list");

// Load saved tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Display tasks
function displayTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        let taskDiv = document.createElement("div");
        taskDiv.classList.add("task");
        if (task.completed) taskDiv.classList.add("completed");

        taskDiv.innerHTML = `
            <span onclick="toggleComplete(${index})">${task.text}</span>
            <div>
                <button class="edit" onclick="editTask(${index})">Edit</button>
                <button class="delete" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;

        taskList.appendChild(taskDiv);
    });
}

// Add a new task
function addTask() {
    let taskText = taskInput.value.trim();
    if (taskText) {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = "";
        updateLocalStorage();
        displayTasks();
    }
}

// Toggle task completion
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    updateLocalStorage();
    displayTasks();
}

// Edit a task
function editTask(index) {
    let newText = prompt("Edit your task:", tasks[index].text);
    if (newText !== null) {
        tasks[index].text = newText.trim();
        updateLocalStorage();
        displayTasks();
    }
}

// Delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    updateLocalStorage();
    displayTasks();
}

// Update local storage
function updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Initial display of tasks
displayTasks();