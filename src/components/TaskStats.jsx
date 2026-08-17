const STAT_STYLES = {
  Total:      "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800",
  Todo:       "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800",
  "In Progress": "bg-white dark:bg-slate-900 border-indigo-100 dark:border-indigo-900",
  Completed:  "bg-white dark:bg-slate-900 border-emerald-100 dark:border-emerald-900",
  Overdue:    "bg-white dark:bg-slate-900 border-red-100 dark:border-red-900",
  Completion: "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800",
};

const VALUE_STYLES = {
  Total:      "text-slate-900 dark:text-slate-50",
  Todo:       "text-slate-600 dark:text-slate-300",
  "In Progress": "text-indigo-600 dark:text-indigo-400",
  Completed:  "text-emerald-600 dark:text-emerald-400",
  Overdue:    "text-red-500 dark:text-red-400",
  Completion: "text-slate-900 dark:text-slate-50",
};

const TaskStats = ({ stats }) => {
  const items = [
    { label: "Total", value: stats?.total ?? 0 },
    { label: "Todo", value: stats?.todo ?? 0 },
    { label: "In Progress", value: stats?.inProgress ?? 0 },
    { label: "Completed", value: stats?.completed ?? 0 },
    { label: "Overdue", value: stats?.overdue ?? 0 },
    { label: "Completion", value: `${stats?.completionPercentage ?? 0}%` },
  ];
  return (
    <div className="task-stats grid grid-cols-3 sm:grid-cols-6 gap-3 backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-4" aria-label="Dashboard statistics">
      {items.map((item) => (
        <div
          className={`task-stat flex flex-col items-center justify-center gap-0.5 rounded-xl border px-3 py-4 ${STAT_STYLES[item.label] ?? "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"}`}
          key={item.label}
        >
          <span className={`task-stat__value text-2xl font-bold tabular-nums leading-none ${VALUE_STYLES[item.label] ?? "text-slate-900 dark:text-slate-50"}`}>
            {item.value}
          </span>
          <span className="task-stat__label text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TaskStats;
