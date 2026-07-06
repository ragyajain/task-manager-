import React from "react";
import { FiList, FiCheckCircle, FiClock } from "react-icons/fi";

function TaskCounter({ tasks }) {
  const total     = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending   = total - completed;

  return (
    <div className="stat-cards">
      <div className="stat-card">
        <div className="stat-icon purple"><FiList /></div>
        <div>
          <div className="stat-label">Total</div>
          <div className="stat-value">{total}</div>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon green"><FiCheckCircle /></div>
        <div>
          <div className="stat-label">Completed</div>
          <div className="stat-value">{completed}</div>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon orange"><FiClock /></div>
        <div>
          <div className="stat-label">Pending</div>
          <div className="stat-value">{pending}</div>
        </div>
      </div>
    </div>
  );
}
export default TaskCounter;
