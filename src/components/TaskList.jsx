import React from "react";
import TaskItem from "./TaskItem";
import EmptyState from "./EmptyState";

function TaskList({ tasks, onToggleComplete, onDelete, onEdit }) {
  if (tasks.length === 0) return <EmptyState />;
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
export default TaskList;
