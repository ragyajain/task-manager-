import React from "react";
import { FiAlertTriangle } from "react-icons/fi";

function ConfirmModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;
  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-icon"><FiAlertTriangle /></div>
        <h3>Delete Task?</h3>
        <p>This action cannot be undone. Are you sure you want to delete this task?</p>
        <div className="modal-actions">
          <button className="btn-ghost" onClick={onCancel}>Cancel</button>
          <button className="btn-danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}
export default ConfirmModal;
