import EmptyState from './EmptyState'
import TaskItem from './TaskItem'

function TaskList({
  tasks = [],
  onEditTask,
  onDeleteTask,
  onToggleComplete,
  emptyTitle = 'No tasks found',
  emptyMessage = 'Create a task or adjust your filters to see work here.',
  onAddTask,
}) {
  if (tasks.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        message={emptyMessage}
        actionLabel={onAddTask ? 'Add task' : undefined}
        onAction={onAddTask}
      />
    )
  }

  return (
    <div className="task-list" aria-label="Task list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEditTask}
          onDelete={onDeleteTask}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </div>
  )
}

export default TaskList
