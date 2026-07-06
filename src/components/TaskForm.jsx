import React, { useState, useEffect } from "react";
import { FiPlus, FiEdit2 } from "react-icons/fi";
import { CATEGORIES } from "../helpers";

const MAX_CHARS = 100;

function TaskForm({ onAddTask, onUpdateTask, editingTask, onCancelEdit }) {
  const [title, setTitle]       = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("Personal");
  const [dueDate, setDueDate]   = useState("");

  // When editingTask changes, fill the form with its values
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setPriority(editingTask.priority);
      setCategory(editingTask.category || "Personal");
      setDueDate(editingTask.dueDate || "");
    } else {
      setTitle("");
      setPriority("Medium");
      setCategory("Personal");
      setDueDate("");
    }
  }, [editingTask]);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    const payload = { title: trimmed, priority, category, dueDate };

    if (editingTask) {
      onUpdateTask({ ...editingTask, ...payload });
    } else {
      onAddTask(payload);
    }

    setTitle("");
    setPriority("Medium");
    setCategory("Personal");
    setDueDate("");
  }

  const charsLeft = MAX_CHARS - title.length;
  const counterClass =
    charsLeft <= 0 ? "at-limit" : charsLeft <= 15 ? "near-limit" : "";

  return (
    <div className="task-form-card">
      <h2>{editingTask ? "Edit Task" : "New Task"}</h2>

      <form onSubmit={handleSubmit}>
        {/* Title input with character counter */}
        <div className="form-title-row">
          <input
            type="text"
            className="task-input"
            placeholder="What needs to be done?"
            value={title}
            maxLength={MAX_CHARS}
            onChange={(e) => setTitle(e.target.value)}
          />
          <span className={`char-counter ${counterClass}`}>
            {title.length} / {MAX_CHARS}
          </span>
        </div>

        {/* Priority, Category, Due Date */}
        <div className="form-fields-row">
          <div className="form-select-wrapper">
            <select
              className="form-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Low">🟢 Low</option>
              <option value="Medium">🟡 Medium</option>
              <option value="High">🔴 High</option>
            </select>
          </div>

          <div className="form-select-wrapper">
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <input
            type="date"
            className="form-date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        {/* Action buttons */}
        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {editingTask ? <FiEdit2 /> : <FiPlus />}
            {editingTask ? "Save Changes" : "Add Task"}
          </button>

          {editingTask && (
            <button
              type="button"
              className="btn-ghost"
              onClick={onCancelEdit}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
