/*
  helpers.js — Small, pure utility functions used across multiple components.
  Keeping them here means components stay clean and focused on rendering.
*/

// Returns true if a due date has already passed (task is overdue)
export function isOverdue(dueDate) {
  if (!dueDate) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(dueDate) < today;
}

// Formats "2025-08-15" → "Aug 15"
export function formatDate(dueDate) {
  if (!dueDate) return "";
  // Append T00:00:00 to prevent timezone from shifting the date by one day
  return new Date(dueDate + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

// Sort order for priority (High sorts first)
export const PRIORITY_ORDER = { High: 0, Medium: 1, Low: 2 };

// All available task categories
export const CATEGORIES = ["Study", "Work", "Personal", "Health", "Others"];

// Sorts a copy of the tasks array based on the chosen sort option
export function sortTasks(tasks, sortBy) {
  const copy = [...tasks];
  switch (sortBy) {
    case "oldest":
      return copy.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
    case "priority":
      return copy.sort(
        (a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
      );
    case "dueDate":
      return copy.sort((a, b) => {
        if (!a.dueDate) return 1;   // tasks without a due date go last
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
    case "alphabetical":
      return copy.sort((a, b) => a.title.localeCompare(b.title));
    case "newest":
    default:
      return copy.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  }
}
