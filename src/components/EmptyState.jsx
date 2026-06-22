import React from "react";

function EmptyState() {
  return (
    <div className="empty-state">
      <p className="empty-state-emoji">📝</p>
      <p className="empty-state-text">No tasks found.</p>
      <p className="empty-state-subtext">
        Add a new task above to get started.
      </p>
    </div>
  );
}

export default EmptyState;
