import React from "react";

function ProgressCard({ tasks }) {
  const total     = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const percent   = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="progress-card">
      <h3>Today's Progress</h3>
      <div className="progress-fraction">
        {completed} <span>/ {total} tasks</span>
      </div>
      <div className="progress-bar-track">
        <div className="progress-bar-fill" style={{ width: `${percent}%` }} />
      </div>
      <div className="progress-percent">{percent}% complete</div>
    </div>
  );
}
export default ProgressCard;
