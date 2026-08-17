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
    <div className="task-stats" aria-label="Dashboard statistics">
      {items.map((item) => (
        <div className="task-stat" key={item.label}>
          <span className="task-stat__value">{item.value}</span>
          <span className="task-stat__label">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default TaskStats;
