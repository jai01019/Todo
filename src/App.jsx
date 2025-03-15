


import { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import TaskInput from "./components/TaskInput";
import { DarkModeToggle } from "./components/DarkModeToggle";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./styles.css";

function App() {
  // ✅ Load tasks from LocalStorage at startup
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // ✅ Load dark mode preference from LocalStorage
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // ✅ Save tasks to LocalStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // ✅ Save dark mode preference
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  // ✅ Functions for managing tasks
  const addTask = (text) => {
    const newTask = { id: Date.now(), text, completed: false };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const toggleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const editTask = (id, newText) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
  };

  return (
    <div className={`container py-5 ${darkMode ? "bg-dark text-white" : "bg-light text-dark"}`}>
      <div className="card shadow p-4">
        <h1 className="text-center">Interactive To-Do List</h1>
        <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        <TaskInput addTask={addTask} />
        <TaskList
          tasks={tasks}
          setTasks={setTasks}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      </div>
    </div>
  );
}

export default App;
