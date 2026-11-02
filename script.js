// Exercise 2 - Task Board
// Write all your code in this file. Read README.md for the full instructions.
// Run the tests with: npm test

// Step 1: add a task on submit (no reload, clear + focus the input, "Please type a task" error)
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const prioritySelect = document.getElementById("priority-select");
const taskList = document.getElementById("task-list");
const filterButtonList = document.getElementById("filters");
const errorMessage = document.getElementById("error");
const tasksLeftCounter = document.getElementById("left");
const clearDoneButton = document.getElementById("clear-done");
const emptyMessage = document.getElementById("empty");
function updateTasksLeft() {
    if (!tasksLeftCounter) return;

    const remainingTasks = [...taskList.querySelectorAll("li")].filter(
        (task) => !task.classList.contains("done")
    ).length;

    tasksLeftCounter.textContent = remainingTasks;
}

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    if (!taskText) {
        errorMessage.textContent = "Please type a task";
        errorMessage.hidden = false;
        return;
    }

    const task = document.createElement("li");
    task.className = `priority-${prioritySelect.value}`;

    const text = document.createElement("span");
    text.className = "text";
    text.textContent = taskText;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.type = "button";
    deleteButton.textContent = "x";

    task.append(text, deleteButton);
    const activeFilterButton = filterButtonList.querySelector("button.active");
    if (activeFilterButton && activeFilterButton.dataset.filter === "done") {
        task.hidden = true;
    }
    taskList.appendChild(task);
    updateEmptyMessage();

    errorMessage.hidden = true;
    taskInput.value = "";
    taskInput.focus();
    updateTasksLeft();
});



// Step 2: click a task to toggle the "done" class
taskList.addEventListener("click", (event) => {
    const deleteButton = event.target.closest(".delete");
    if (deleteButton) {
        const taskItem = deleteButton.closest("li");
        if (taskItem) {
            taskItem.remove();
            updateEmptyMessage();
            updateTasksLeft();
        }
        return;
    }

    const taskItem = event.target.closest("li");
    if (!taskItem) return;

    taskItem.classList.toggle("done");
    updateTasksLeft();
});



// Step 3: delete with the x button (one listener on the ul - event delegation)

// Step 4: "tasks left" counter
updateTasksLeft();
console.log("JavaScript is working!");
// Step 5: filters (All / Active / Done)
filterButtonList.addEventListener("click", (event) => {
    const buttons = filterButtonList.querySelectorAll("button");
    buttons.forEach(element => {
        element.classList.remove("active");
    });
    event.target.classList.add("active");
    const data_filter = event.target.dataset.filter;
    const tasks = taskList.querySelectorAll("li");
    tasks.forEach(element => {
        if (data_filter === "active") {
            element.hidden = element.classList.contains("done");
        }
        else if (data_filter === "done") {
            element.hidden = !element.classList.contains("done");
        }
        else {
            element.hidden = false;
        }
    })


})
// Step 6: Clear completed
clearDoneButton.addEventListener("click", () => {
    const completedTasks = taskList.querySelectorAll(".done");

    completedTasks.forEach(task => {
        task.remove();
    })
    updateTasksLeft();
    updateEmptyMessage();
})

// Step 7: show the empty message only when there are no tasks
function updateEmptyMessage() {
    if (taskList.children.length === 0) {
        emptyMessage.hidden = false;
    } else {
        emptyMessage.hidden = true;
    }
}
updateEmptyMessage();
// Bonus: block duplicate tasks ("This task already exists")
