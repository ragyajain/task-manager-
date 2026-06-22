import React from "react";

function TaskCounter({ tasks }) {
  const totalCount = tasks.length;
  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = totalCount - completedCount;

  return (
    <div className="task-counter">
      <span>
        Total: <strong>{totalCount}</strong>
      </span>
      <span>
        Completed: <strong>{completedCount}</strong>
      </span>
      <span>
        Pending: <strong>{pendingCount}</strong>
      </span>
    </div>
  );
}

export default TaskCounter;
