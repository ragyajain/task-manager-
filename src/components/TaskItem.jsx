import React from "react";
import { FiEdit2, FiTrash2, FiCalendar } from "react-icons/fi";
import { isOverdue, formatDate } from "../helpers";

/*
  TaskItem renders one task card. It calls parent callbacks on user interaction.
  Priority is shown as a colored left border + badge.
  Category and due date appear as small pill badges below the title.
*/
function TaskItem({ task, onToggleComplete, onDelete, onEdit }) {
  const overdue = isOverdue(task.dueDate) && !task.completed;

  const itemClass = [
    "task-item",
    `priority-${task.priority}`,
    task.completed ? "completed" : "",
    overdue ? "overdue" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <li className={itemClass}>
      {/* Custom styled checkbox */}
      <div
        className={`task-checkbox ${task.completed ? "checked" : ""}`}
        onClick={() => onToggleComplete(task.id)}
        role="checkbox"
        aria-checked={task.completed}
        tabIndex={0}
        onKeyDown={(e) => e.key === " " && onToggleComplete(task.id)}
      />

      {/* Task content */}
      <div className="task-body">
        <p className="task-title">{task.title}</p>

        <div className="task-meta">
          {/* Priority badge */}
          <span className={`badge-priority ${task.priority}`}>
            {task.priority}
          </span>

          {/* Category badge */}
          {task.category && (
            <span className={`badge-category cat-${task.category}`}>
              {task.category}
            </span>
          )}

          {/* Due date badge — red if overdue */}
          {task.dueDate && (
            <span className={`badge-due ${overdue ? "overdue" : ""}`}>
              <FiCalendar />
              {overdue && !task.completed ? "Overdue · " : ""}
              {formatDate(task.dueDate)}
            </span>
          )}
        </div>
      </div>

      {/* Edit and Delete icon buttons */}
      <div className="task-actions">
        <button
          className="icon-btn edit"
          onClick={() => onEdit(task)}
          title="Edit task"
        >
          <FiEdit2 />
        </button>
        <button
          className="icon-btn delete"
          onClick={() => onDelete(task.id)}
          title="Delete task"
        >
          <FiTrash2 />
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
