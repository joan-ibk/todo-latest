<template>
  <div
    id="app"
    :class="{ 'light-mode': isLightMode, 'dark-mode': !isLightMode }"
  >
    <div class="container">
      <div class="task">
        <div class="head-flex">
          <h1 id="todo">TODO</h1>
          <div class="theme-panel" @click="toggleLightMode">
            <svg
              v-if="isLightMode"
              id="moon"
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.513 11.397a.701.701 0 00-.588.128 7.496 7.496 0 01-2.276 1.336 7.101 7.101 0 01-2.583.462 7.505 7.505 0 01-5.32-2.209 7.568 7.568 0 01-2.199-5.342c0-.873.154-1.72.41-2.49a6.904 6.904 0 011.227-2.21.657.657 0 00-.102-.924.701.701 0 00-.589-.128C5.32.61 3.427 1.92 2.072 3.666A10.158 10.158 0 000 9.83c0 2.8 1.125 5.342 2.967 7.19a10.025 10.025 0 007.16 2.98c2.353 0 4.527-.822 6.266-2.183a10.13 10.13 0 003.58-5.624.623.623 0 00-.46-.796z"
                fill="#697C9A"
                fill-rule="nonzero"
              />
            </svg>
            <svg
              v-else
              id="sun"
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="#FFF" fill-rule="nonzero">
                <path
                  d="M13.545 6.455c-.9-.9-2.17-1.481-3.545-1.481a4.934 4.934 0 00-3.545 1.481c-.9.9-1.481 2.17-1.481 3.545 0 1.376.582 2.646 1.481 3.545.9.9 2.17 1.481 3.545 1.481a4.934 4.934 0 003.545-1.481c.9-.9 1.481-2.17 1.481-3.545a4.934 4.934 0 00-1.481-3.545zM10 3.413a.7.7 0 00.688-.688V.688A.7.7 0 0010 0a.7.7 0 00-.688.688v2.037a.7.7 0 00.688.688zM15.635 5.344l1.455-1.455a.67.67 0 000-.952.67.67 0 00-.952 0l-1.455 1.455a.67.67 0 000 .952c.238.264.66.264.952 0zM19.312 9.312h-2.037a.7.7 0 00-.688.688.7.7 0 00.688.688h2.037A.7.7 0 0020 10a.7.7 0 00-.688-.688zM15.608 14.656a.67.67 0 00-.952 0 .67.67 0 000 .952l1.455 1.455a.67.67 0 00.952 0 .67.67 0 000-.952l-1.455-1.455zM10 16.587a.7.7 0 00-.688.688v2.037A.7.7 0 0010 20a.7.7 0 00.688-.688v-2.037a.7.7 0 00-.688-.688zM4.365 14.656L2.91 16.111a.67.67 0 000 .952.67.67 0 00.952 0l1.455-1.455a.67.67 0 000-.952c-.238-.264-.66-.264-.952 0zM3.413 10a.7.7 0 00-.688-.688H.688A.7.7 0 000 10a.7.7 0 00.688.688h2.037A.7.7 0 003.413 10zM4.365 5.344a.67.67 0 00.952 0 .67.67 0 000-.952L3.862 2.937a.67.67 0 00-.952 0 .67.67 0 000 .952l1.455 1.455z"
                />
              </g>
            </svg>
          </div>
        </div>
        <div class="form">
          <button class="btn" @click="addTask"></button>
          <input
            id="get-user"
            type="text"
            placeholder="Create a new todo..."
            v-model="newTask"
            @keyup.enter="addTask"
          />
        </div>
        <div class="taskItems">
          <div
            class="todo-item"
            v-for="(task, index) in filteredTasks"
            :key="task.id"
          >
            <label>
              <input
                type="checkbox"
                :checked="task.completed"
                @change="completeTask(task)"
              />
              <span class="checkmark"></span>
            </label>
            <div
              class="task-content"
              :class="task.completed ? 'toggle toggle-completed' : 'toggle'"
            >
              {{ task.title }}
            </div>
            <div class="actions">
              <button @click="removeTask(index)">
                <img src="./assets/icon-cross.svg" alt="Remove task" />
              </button>
            </div>
          </div>
          <div class="foot-flex">
            <div class="pendingTasks">
              <span> {{ incomplete }} items left</span>
            </div>
            <div class="linkFlex">
              <a  class="active" @click.prevent="showAll">All</a>
              <a  @click.prevent="showActive">Active</a>
              <a  @click.prevent="showCompleted">Completed</a>
            </div>
            <div class="link">
              <a @click="clearCompleted">Clear completed</a>
            </div>
            
          </div>
          
        </div>
      </div>
      <div class="linkFlex2">
              <a  class="active" @click.prevent="showAll">All</a>
              <a  @click.prevent="showActive">Active</a>
              <a  @click.prevent="showCompleted">Completed</a>
            </div>
    </div>
  </div>
</template>


 

<script>
export default {
  name: "TaskApp",
  data() {
    return {
      tasks: JSON.parse(localStorage.getItem("tasks")) || [
        { id: 1, title: "Complete online JavaScript course", completed: false },
        { id: 2, title: "Jog around the park 3x", completed: false },
        { id: 3, title: "10 minutes meditation", completed: false },
        { id: 4, title: "Read for 1hr", completed: false },
        { id: 5, title: "Pick up groceries", completed: false },
        {
          id: 6,
          title: "Complete Todo App on Frontend Mentor",
          completed: true,
        },
      ],
      newTask: "",
      filter: "all",
      isLightMode: false, // Default is dark mode
    };
  },
  mounted() {
    this.loadTheme(); // Load the saved theme on mount
  },
  computed: {
    incomplete() {
      return this.tasks.filter((task) => !task.completed).length;
    },
    filteredTasks() {
      if (this.filter === "active") {
        return this.tasks.filter((task) => !task.completed); // Only show active tasks
      } else if (this.filter === "completed") {
        return this.tasks.filter((task) => task.completed); // Only show completed tasks
      }
      return this.tasks; // Show all tasks by default
    },
  },
  methods: {
    addTask() {
      if (this.newTask) {
        const task = {
          id: Date.now(), // Add a unique id to each task
          title: this.newTask,
          completed: false,
        };
        this.tasks.push(task);
        this.newTask = "";
        this.saveTasksToLocalStorage();
      }
    },
    showAll() {
      this.filter = "all"; // Set filter to all
    },
    showActive() {
      this.filter = "active"; // Set filter to active
    },
    showCompleted() {
      this.filter = "completed"; // Set filter to 'completed'
    },
    clearCompleted() {
      this.tasks = this.tasks.filter((task) => !task.completed); // Remove completed tasks
      this.saveTasksToLocalStorage();
    },
    completeTask(task) {
      task.completed = !task.completed; // Toggle task completion
      this.saveTasksToLocalStorage();
    },
    removeTask(index) {
      this.tasks.splice(index, 1); // Remove task by index
      this.saveTasksToLocalStorage();
    },
    saveTasksToLocalStorage() {
      localStorage.setItem("tasks", JSON.stringify(this.tasks)); // Save tasks to localStorage
    },
    toggleLightMode() {
      this.isLightMode = !this.isLightMode;
      localStorage.setItem("theme", this.isLightMode ? "light" : "dark");
      document.body.className = this.isLightMode ? "light-mode" : "dark-mode"; // Update body class for immediate theme change
    },
    loadTheme() {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        this.isLightMode = savedTheme === "light";
        document.body.className = this.isLightMode ? "light-mode" : "dark-mode"; // Set the body class based on saved theme
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  list-style: none;
}
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Josefin Sans", sans-serif;
}
.dark-mode {
  --bright-blue: hsl(220, 98%, 61%);
  --check-background: hsl(192, 100%, 67%) to hsl(280, 87%, 65%);
  --background-color: hsl(235, 21%, 11%);
  --background-form: hsl(235, 24%, 19%);
  --mode-text: hsl(234, 39%, 85%);
  --mode-flex: hsl(234, 39%, 85%);
  --todo-header: hsl(236, 33%, 92%);
  --todo-para: hsl(236, 33%, 92%);
  --theme-flex: hsl(234, 11%, 52%);
  --very-dark-grayish-blue: hsl(233, 14%, 35%);
  --very-dark-grayish-blue: hsl(237, 14%, 26%);
  background-image: url(/src/assets/bg-desktop-dark.jpg);
  width: 100%;
  background-repeat: no-repeat;
}
.light-mode {
  --background-color: hsl(0, 0%, 98%);
  --background-form: hsl(0, 0%, 98%);
  --todo-header: hsl(236, 33%, 92%);
  --mode-flex: hsl(233, 11%, 84%);
  --theme-flex: hsl(236, 9%, 61%);
  --mode-text: hsl(235, 19%, 35%);
  --todo-para: hsl(237, 14%, 26%);
  --bright-blue: hsl(220, 98%, 61%);
  background-image: url(/src/assets/bg-desktop-light.jpg);
  width: 100%;
  background-repeat: no-repeat;
}
body {
  background: var(--background-color);
  transition: background 0.8s, color 0.8s;
}
.imgone {
  width: 100%;
}
.container {
  max-width: 480px;
  margin: 0 auto;
  padding: 0 15px;
  margin-top: 4.8rem;
}
.head-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
#todo {
  font-size: 35px;
  font-style: bold;
  letter-spacing: 0.5rem;
  color: var(--todo-header);
  font-weight: 700;
}
.btn {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: transparent;
  border: 1px solid var(--mode-flex);
  /* padding: 7px; */
}
.form {
  position: relative;
  height: 55px;
  width: 100%;
  background: var(--background-form);
  margin-top: 1.5rem;
  border-radius: 5px;
  box-shadow: 0 5px 10px 16px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
}
.form input {
  height: 100%;
  width: 100%;
  outline: none;
  font-size: 18px;
  font-weight: 400;
  border: none;
  padding: 0 50px 0 10px;
  background-color: transparent;
  color: var(--mode-text);
}

.taskItems {
  /* position: relative;
  width: 100%; */
  background: var(--background-form);
  margin-top: 1.5rem;
  border-radius: 5px;
  box-shadow: 0 5px 10px 16px rgba(0, 0, 0, 0.1);
}

.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid rgba(208, 224, 240, 0.2);
  color: var(--mode-text);
  opacity: 0.8;
  transition: all 0.3s ease;
}

.todo-item label {
  display: block;
  margin-right: 1rem;
  cursor: pointer;
}
.todo-item .task-content {
  flex: 1;
}
.task-content {
  padding: 0 15px;
}

.todo-item label {
  position: relative;
  cursor: pointer;
}

.todo-item label input[type="checkbox"] {
  /* Hide the default checkbox */
  appearance: none;
  -webkit-appearance: none;
  visibility: hidden;
}

.checkmark {
  position: absolute;
  width: 20px;
  height: 20px;
  /* top: 15px;
  left: 16px; */
  background-color: transparent;
  border-radius: 50%;
  /* padding: 7px; */
  border: 1px solid var(--mode-flex);
  transition: all 0.3s ease;
}

.checkmark:hover {
  border: 2px solid hsl(192, 100%, 67%);
}
.todo-item input[type="checkbox"]:hover ~ .checkmark {
  background-color: var(--check-background);
}

/* When the checkbox is checked, add the blue gradient background */
.todo-item input[type="checkbox"]:checked ~ .checkmark {
  background-image: linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%));
  border: none;
}

/* Create the checkmark (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when the checkbox is checked */
.todo-item input[type="checkbox"]:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.checkmark:after {
  width: 2px;
  height: 5px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);

  /* Center the checkmark inside the circle */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);

  /* display: block; */
}

.todo-item .task-content.toggle-completed {
  text-decoration: line-through;
  color: var(--theme-flex);
  opacity: 0.6;
}
.actions button {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  outline: none;
  cursor: pointer;
}

.actions button i {
  color: var(--mode-text);
  font-size: 24px;
  font-weight: 100;
  transition: color 0.2s;
  opacity: 0.8;
}

.foot-flex {
  display: flex;
  gap: 2rem;
  font-size: 13px;
  padding: 15px 18px 13px 18px;
  /* margin-left: -1.5rem; */
}
.pendingTasks,
.foot-flex p {
  color: var(--mode-text);
  opacity: 0.8;
}
.linkFlex {
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  cursor: pointer;
}
a {
  color: var(--mode-text);
  opacity: 0.8;
}
a:hover {
  color: var(--todo-para);
}

a.active {
  color: var(--bright-blue);
  font-weight: bold;
}
.link {
  cursor: pointer;
}
.linkFlex2 {
  display: none;
  
}

@media (width < 600px){
  .linkFlex2{
    display: block;
    background: var(--background-form);
  margin-top: 1.5rem;
  border-radius: 5px;
  box-shadow: 0 5px 10px 16px rgba(0, 0, 0, 0.1);
  height: 50px;
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  }
  .linkFlex{
    display: none;
    
  }
  .foot-flex {
  display: flex;
  justify-content: space-between;
}
}
</style>
  