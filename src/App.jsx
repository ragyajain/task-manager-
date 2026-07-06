import React, { useState, useEffect } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import { sortTasks } from "./helpers";

import TaskForm      from "./components/TaskForm";
import TaskList      from "./components/TaskList";
import FilterBar     from "./components/FilterBar";
import SearchBar     from "./components/SearchBar";
import TaskCounter   from "./components/TaskCounter";
import DarkModeToggle from "./components/DarkModeToggle";
import ProgressCard  from "./components/ProgressCard";
import SortBar       from "./components/SortBar";
import ConfirmModal  from "./components/ConfirmModal";
import Toast         from "./components/Toast";

import { FiCheckSquare } from "react-icons/fi";
import "./App.css";

function App() {
  // ── Persistent state (saved to Local Storage) ──────────────────────────
  const [tasks, setTasks]         = useLocalStorage("tasks", []);
  const [isDarkMode, setIsDarkMode] = useLocalStorage("isDarkMode", false);

  // ── Ephemeral UI state ──────────────────────────────────────────────────
  const [filter, setFilter]       = useState("All");      // All | Completed | Pending
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy]       = useState("newest");
  const [editingTask, setEditingTask] = useState(null);   // null = not editing

  // ── Delete confirmation modal ───────────────────────────────────────────
  const [deleteModal, setDeleteModal] = useState({ open: false, taskId: null });

  // ── Toast notifications ─────────────────────────────────────────────────
  const [toasts, setToasts] = useState([]);

  function showToast(message, type = "success") {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    // Auto-remove after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }

  function removeToast(id) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  // ── Side effect: sync dark mode class on <body> ──────────────────────────
  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  // ── CREATE ───────────────────────────────────────────────────────────────
  function handleAddTask({ title, priority, dueDate, category }) {
    const newTask = {
      id: Date.now(),
      title,
      priority,
      dueDate,
      category,
      completed: false,
      createdAt: Date.now(),   // used for "newest" / "oldest" sort
    };
    setTasks([newTask, ...tasks]);
    showToast("Task added successfully!");
  }

  // ── UPDATE (edit title, priority, due date, category) ────────────────────
  function handleUpdateTask(updatedTask) {
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    setEditingTask(null);
    showToast("Task updated!");
  }

  // ── UPDATE (toggle complete checkbox) ────────────────────────────────────
  function handleToggleComplete(taskId) {
    setTasks(
      tasks.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      )
    );
  }

  // ── DELETE (two-step: open modal → confirm) ───────────────────────────────
  function handleDeleteClick(taskId) {
    setDeleteModal({ open: true, taskId });
  }

  function handleConfirmDelete() {
    setTasks(tasks.filter((t) => t.id !== deleteModal.taskId));
    setDeleteModal({ open: false, taskId: null });
    showToast("Task deleted.", "danger");
  }

  function handleCancelDelete() {
    setDeleteModal({ open: false, taskId: null });
  }

  // ── EDIT MODE ─────────────────────────────────────────────────────────────
  function handleStartEdit(task) {
    setEditingTask(task);
    // Scroll to top so the form is visible
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleCancelEdit() {
    setEditingTask(null);
  }

  // ── CLEAR COMPLETED ───────────────────────────────────────────────────────
  function handleClearCompleted() {
    setTasks(tasks.filter((t) => !t.completed));
    showToast("Completed tasks cleared.");
  }

  // ── FILTER + SEARCH + SORT ────────────────────────────────────────────────
  // Derived from "tasks" on every render — no separate state needed.
  const visibleTasks = sortTasks(
    tasks
      .filter((t) => {
        if (filter === "Completed") return t.completed;
        if (filter === "Pending")   return !t.completed;
        return true;
      })
      .filter((t) =>
        t.title.toLowerCase().includes(searchText.toLowerCase())
      ),
    sortBy
  );

  const hasCompleted = tasks.some((t) => t.completed);

  return (
    <div className="app-container">
      {/* ── Header ── */}
      <header className="app-header">
        <div className="app-logo">
          <FiCheckSquare className="logo-icon" />
          <h1>Task Manager</h1>
        </div>
        <DarkModeToggle isDarkMode={isDarkMode} onToggle={() => setIsDarkMode(!isDarkMode)} />
      </header>

      <main className="app-main">
        {/* ── Add / Edit Form ── */}
        <TaskForm
          onAddTask={handleAddTask}
          onUpdateTask={handleUpdateTask}
          editingTask={editingTask}
          onCancelEdit={handleCancelEdit}
        />

        {/* ── Progress ── */}
        <ProgressCard tasks={tasks} />

        {/* ── Stat Cards ── */}
        <TaskCounter tasks={tasks} />

        {/* ── Toolbar: Search + Sort ── */}
        <div className="toolbar-card">
          <div className="toolbar-top">
            <SearchBar searchText={searchText} onSearchChange={setSearchText} />
            <SortBar sortBy={sortBy} onSortChange={setSortBy} />
          </div>
          <div className="toolbar-bottom">
            <FilterBar currentFilter={filter} onFilterChange={setFilter} />
            {hasCompleted && (
              <button className="clear-btn" onClick={handleClearCompleted}>
                Clear Completed
              </button>
            )}
          </div>
        </div>

        {/* ── Task List ── */}
        <TaskList
          tasks={visibleTasks}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDeleteClick}
          onEdit={handleStartEdit}
        />
      </main>

      {/* ── Global overlays (rendered outside main flow) ── */}
      <ConfirmModal
        isOpen={deleteModal.open}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      <Toast toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

export default App;
