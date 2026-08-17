import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import TaskItem from "./TaskItem";


function TaskList({
  tasks = [],
  error,
  isLoading,
  refetch,
  onEdit,
  onDelete,
  completeTaskHandler,
  emptyTitle = "No tasks found",

  emptyMessage = "Create a task or adjust your filters to see work here.",
  onAddTask,
}) {
  const taskItems = Array.isArray(tasks) ? tasks : [];

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error} onAction={refetch} />;
  if (taskItems.length === 0) {
    return <EmptyState title={emptyTitle} message={emptyMessage} actionLabel={onAddTask ? "Add task" : undefined} onAction={onAddTask} />;
  }

  return (
    <div className="task-list space-y-3" aria-label="Task list">
      {!isLoading &&
        taskItems.map((task) => (
          <TaskItem key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} completeTaskHandler={completeTaskHandler} />
        ))}
    </div>
  );
}

export default TaskList;
