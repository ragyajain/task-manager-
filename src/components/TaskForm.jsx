import React, { useState, useEffect } from "react";

function TaskForm({ onAddTask, onUpdateTask, editingTask, onCancelEdit }) {
  // Local state for the form fields
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Low");

  // Whenever "editingTask" changes, fill the form with its data.
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setPriority(editingTask.priority);
    } else {
      // No task being edited -> reset the form to empty/default values
      setTitle("");
      setPriority("Low");
    }
  }, [editingTask]);

  // Runs when the form is submitted (Add button or Enter key)
  function handleSubmit(event) {
    event.preventDefault(); // stop the page from refreshing

    const trimmedTitle = title.trim();
    if (trimmedTitle === "") return; // ignore empty tasks

    if (editingTask) {
      // We are editing an existing task -> send the updated data up
      onUpdateTask({ ...editingTask, title: trimmedTitle, priority });
    } else {
      // We are creating a brand new task
      onAddTask({ title: trimmedTitle, priority });
    }

    // Clear the form after submit
    setTitle("");
    setPriority("Low");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="task-input"
        placeholder="What needs to be done?"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <select
        className="priority-select"
        value={priority}
        onChange={(event) => setPriority(event.target.value)}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <button type="submit" className="btn btn-primary">
        {editingTask ? "Save Changes" : "Add Task"}
      </button>

      {/* Only show Cancel button while editing */}
      {editingTask && (
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancelEdit}
        >
          Cancel
        </button>
      )}
    </form>
  );
}

export default TaskForm;
