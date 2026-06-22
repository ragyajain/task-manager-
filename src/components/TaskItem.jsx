import React from "react";

function TaskItem({ task, onToggleComplete, onDelete, onEdit }) {
  const priorityClass = `priority-badge priority-${task.priority.toLowerCase()}`;

  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="task-left">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          className="task-checkbox"
        />
        <span className="task-title">{task.title}</span>
        <span className={priorityClass}>{task.priority}</span>
      </div>

      <div className="task-actions">
        <button className="btn btn-small" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button
          className="btn btn-small btn-danger"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
