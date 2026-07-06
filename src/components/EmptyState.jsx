import React from "react";

function EmptyState() {
  return (
    <div className="empty-state">
      <svg viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        
        <rect x="38" y="42" width="124" height="122" rx="14" fill="var(--card-alt)" />
        
        <rect x="78" y="30" width="44" height="26" rx="10" fill="var(--secondary)" opacity="0.6" />
        <rect x="88" y="34" width="24" height="14" rx="6" fill="var(--card)" />
        
        <rect x="56" y="80" width="88" height="9" rx="4.5" fill="var(--border)" />
        <rect x="56" y="101" width="68" height="9" rx="4.5" fill="var(--border)" />
        <rect x="56" y="122" width="78" height="9" rx="4.5" fill="var(--border)" />
        
        <circle cx="48" cy="84" r="6" fill="var(--success)" opacity="0.5" />
        <circle cx="48" cy="105" r="6" fill="var(--border)" />
        <circle cx="48" cy="126" r="6" fill="var(--border)" />
        
        <circle cx="152" cy="148" r="22" fill="var(--primary)" />
        <rect x="144" y="145" width="16" height="6" rx="3" fill="white" />
        <rect x="149" y="140" width="6" height="16" rx="3" fill="white" />
      </svg>
      <h3>No Tasks Yet</h3>
      <p>Add your first task above to stay organized.</p>
    </div>
  );
}
export default EmptyState;
