const STATUS_OPTIONS = [
  { value: "all", label: "All statuses" },
  { value: "todo", label: "To do" },
  { value: "in-progress", label: "In progress" },
  { value: "completed", label: "Completed" },
];

const PRIORITY_OPTIONS = [
  { value: "all", label: "All priorities" },
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

function TaskFilters({
  status = "all",
  priority = "all",
  sortBy = "createdAt",
  onStatusChange,
  onPriorityChange,
  onSortChange,
}) {
  return (
   <div className="task-filters">
      <select value={status} onChange={(e) => onStatusChange?.(e.target.value)}>
        {STATUS_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>

      <select value={priority} onChange={(e) => onPriorityChange?.(e.target.value)}>
        {PRIORITY_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>

      <select value={sortBy} onChange={(e) => onSortChange?.(e.target.value)}>
        <option value="createdAt">Newest first</option>
        <option value="dueDate">Due date</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  )
}

export default TaskFilters
