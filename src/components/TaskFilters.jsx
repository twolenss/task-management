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

const selectClass = "h-9 pl-3 pr-8 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition appearance-none cursor-pointer";

function TaskFilters({
  status = "all",
  priority = "all",
  sortBy = "createdAt",
  onStatusChange,
  onPriorityChange,
  onSortChange,
}) {
  return (
    <div className="task-filters flex flex-wrap gap-2">
      <select
        value={status}
        onChange={(e) => onStatusChange?.(e.target.value)}
        className={selectClass}
      >
        {STATUS_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>

      <select
        value={priority}
        onChange={(e) => onPriorityChange?.(e.target.value)}
        className={selectClass}
      >
        {PRIORITY_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>

      <select
        value={sortBy}
        onChange={(e) => onSortChange?.(e.target.value)}
        className={selectClass}
      >
        <option value="createdAt">Newest first</option>
        <option value="dueDate">Due date</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  );
}

export default TaskFilters
