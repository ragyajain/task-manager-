import React from "react";
import { FiCheckCircle, FiTrash2, FiInfo, FiX } from "react-icons/fi";

const ICONS = {
  success: <FiCheckCircle />,
  danger:  <FiTrash2 />,
  info:    <FiInfo />,
};

function Toast({ toasts, onRemove }) {
  if (toasts.length === 0) return null;
  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`toast ${t.type || "success"}`}
          onClick={() => onRemove(t.id)}
        >
          <span className="toast-icon">{ICONS[t.type] || ICONS.success}</span>
          {t.message}
          <button className="toast-close"><FiX /></button>
        </div>
      ))}
    </div>
  );
}
export default Toast;
