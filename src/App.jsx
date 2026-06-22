import React, { useState, useEffect } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";
import SearchBar from "./components/SearchBar";
import TaskCounter from "./components/TaskCounter";
import DarkModeToggle from "./components/DarkModeToggle";
import "./App.css";

function App() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);

  // UI STATE
  const [filter, setFilter] = useState("All"); // "All" | "Completed" | "Pending"
  const [searchText, setSearchText] = useState("");
  const [editingTask, setEditingTask] = useState(null); // null = not editing
  const [isDarkMode, setIsDarkMode] = useLocalStorage("isDarkMode", false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  // CREATE 
  function handleAddTask({ title, priority }) {
    const newTask = {
      id: Date.now(),
      title,
      priority,
      completed: false,
    };
    setTasks([newTask, ...tasks]); 
  }

  // UPDATE 
  function handleUpdateTask(updatedTask) {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setEditingTask(null); 
  }

  // UPDATE COMPLETED
  function handleToggleComplete(taskId) {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  }

  // DELETE
  function handleDeleteTask(taskId) {
    setTasks(tasks.filter((task) => task.id !== taskId));
  }

  // EDIT MODE HELPERS
  function handleStartEdit(task) {
    setEditingTask(task);
  }

  function handleCancelEdit() {
    setEditingTask(null);
  }

  // FILTER + SEARCH  
  const visibleTasks = tasks
    .filter((task) => {
      if (filter === "Completed") return task.completed;
      if (filter === "Pending") return !task.completed;
      return true; // "All"
    })
    .filter((task) =>
      task.title.toLowerCase().includes(searchText.toLowerCase())
    );

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Task Manager</h1>
        <DarkModeToggle
          isDarkMode={isDarkMode}
          onToggle={() => setIsDarkMode(!isDarkMode)}
        />
      </header>

      <main className="app-main">
        <TaskForm
          onAddTask={handleAddTask}
          onUpdateTask={handleUpdateTask}
          editingTask={editingTask}
          onCancelEdit={handleCancelEdit}
        />

        <div className="toolbar">
          <SearchBar searchText={searchText} onSearchChange={setSearchText} />
          <FilterBar currentFilter={filter} onFilterChange={setFilter} />
        </div>

        <TaskCounter tasks={tasks} />

        <TaskList
          tasks={visibleTasks}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDeleteTask}
          onEdit={handleStartEdit}
        />
      </main>
    </div>
  );
}

export default App;
