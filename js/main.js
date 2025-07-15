// filepath: public_html/tasks-v1/js/main.js
document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("task-form");
  const taskInput = document.getElementById("task-input");
  const taskListContainer = document.getElementById("task-list-container");

  // Load tasks from local storage
  loadTasks();

  taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addTask(taskInput.value);
    taskInput.value = ""; // Clear input field
  });

  function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  }

  function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function addTask(taskDescription) {
    if (taskDescription.trim() === "") {
      // Basic validation: prevent empty tasks
      alert("Task description cannot be empty.");
      return;
    }
    const tasks = getTasks();
    const newTask = {
      id: Date.now().toString(), // Unique ID for each task
      description: taskDescription,
      completed: false,
    };
    tasks.push(newTask);
    saveTasks(tasks);
    renderTasks();
  }

  function deleteTask(taskId) {
    let tasks = getTasks();
    tasks = tasks.filter((task) => task.id !== taskId);
    saveTasks(tasks);
    renderTasks();
  }

  function toggleTaskCompleted(taskId) {
    const tasks = getTasks();
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      task.completed = !task.completed;
      saveTasks(tasks);
      renderTasks();
    }
  }

  function renderTasks() {
    const tasks = getTasks();
    taskListContainer.innerHTML = ""; // Clear existing tasks

    if (tasks.length === 0) {
      taskListContainer.innerHTML =
        '<p class="text-muted text-center">No tasks yet. Add one above!</p>';
      return;
    }

    tasks.forEach((task) => {
      const taskElement = document.createElement("div");
      taskElement.className =
        "list-group-item d-flex justify-content-between align-items-center";
      if (task.completed) {
        taskElement.classList.add("list-group-item-success", "task-completed");
      }

      const taskDescriptionElement = document.createElement("span");
      taskDescriptionElement.textContent = task.description;
      taskDescriptionElement.style.textDecoration = task.completed
        ? "line-through"
        : "none";
      taskDescriptionElement.style.cursor = "pointer";
      taskDescriptionElement.addEventListener("click", () =>
        toggleTaskCompleted(task.id)
      );

      const deleteButton = document.createElement("button");
      deleteButton.className = "btn btn-danger btn-sm";
      deleteButton.innerHTML = '<i class="bi bi-trash-fill"></i>';
      deleteButton.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent toggleTaskCompleted from firing
        if (confirm("Are you sure you want to delete this task?")) {
          deleteTask(task.id);
        }
      });

      const taskActions = document.createElement("div");
      taskActions.appendChild(deleteButton);

      taskElement.appendChild(taskDescriptionElement);
      taskElement.appendChild(taskActions);
      taskListContainer.appendChild(taskElement);
    });
  }

  function loadTasks() {
    renderTasks();
  }
});
