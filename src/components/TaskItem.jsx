const STATUS_LABELS = {
  todo: 'To do',
  'in-progress': 'In progress',
  completed: 'Completed',
}

const PRIORITY_LABELS = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
}

function formatDate(dateValue) {
  if (!dateValue) {
    return 'No due date'
  }

  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(dateValue))
}

const PRIORITY_BADGE = {
  high:   "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400 ring-1 ring-red-200 dark:ring-red-800",
  medium: "bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400 ring-1 ring-amber-200 dark:ring-amber-800",
  low:    "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 ring-1 ring-slate-200 dark:ring-slate-700",
};

const STATUS_BADGE = {
  todo:          "bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700",
  "in-progress": "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800",
  completed:     "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800",
};

function TaskItem({ 
  task,
  onEdit,
  onDelete,
  completeTaskHandler
}) {
  if (!task) return null;

  const isCompleted = task.status === 'completed';

  return (
    <article className={`task-item group flex flex-col sm:flex-row sm:items-start gap-4 p-4 sm:p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md ${isCompleted ? 'is-completed opacity-60' : ''}`}>
      <div className="task-item__content flex-1 min-w-0 space-y-2">
        <div className="task-item__header flex items-start justify-between gap-3">
          <h3 className={`text-sm font-semibold text-slate-900 dark:text-slate-50 leading-snug ${isCompleted ? 'line-through text-slate-400 dark:text-slate-500' : ''}`}>
            {task.title}
          </h3>
          <span className={`task-item__priority shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${PRIORITY_BADGE[task.priority] ?? PRIORITY_BADGE.low}`}>
            {PRIORITY_LABELS[task.priority] ?? task.priority}
          </span>
        </div>

        {task.description ? (
          <p className="task-item__description text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
            {task.description}
          </p>
        ) : null}

        <div className="task-item__meta flex flex-wrap items-center gap-2 pt-0.5">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_BADGE[task.status] ?? STATUS_BADGE.todo}`}>
            {STATUS_LABELS[task.status] ?? task.status}
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500">
            Due {formatDate(task.dueDate)}
          </span>
        </div>
      </div>

      <div className="task-item__actions flex sm:flex-col gap-2 sm:gap-1.5 shrink-0">
        <button
          type="button"
          onClick={() => completeTaskHandler?.(task)}
          disabled={isCompleted}
          className="h-7 px-3 text-xs font-medium rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900 disabled:opacity-50 disabled:cursor-not-allowed transition whitespace-nowrap"
        >
          {isCompleted ? 'Completed' : 'Complete'}
        </button>
        <button
          type="button"
          onClick={() => onEdit?.(task)}
          className="h-7 px-3 text-xs font-medium rounded-md bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
        >
          Edit
        </button>
        <button
          className="danger-button h-7 px-3 text-xs font-medium rounded-md bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 transition"
          type="button"
          onClick={() => onDelete?.(task)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default TaskItem
