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

function TaskItem({ task, onEdit, onDelete, onToggleComplete }) {
  if (!task) {
    return null
  }

  const isCompleted = task.status === 'completed'

  return (
    <article className={`task-item ${isCompleted ? 'is-completed' : ''}`}>
      <div className="task-item__content">
        <div className="task-item__header">
          <h3>{task.title}</h3>
          <span className={`priority-badge priority-badge--${task.priority}`}>
            {PRIORITY_LABELS[task.priority] ?? task.priority}
          </span>
        </div>

        {task.description ? (
          <p className="task-item__description">{task.description}</p>
        ) : null}

        <div className="task-item__meta">
          <span>{STATUS_LABELS[task.status] ?? task.status}</span>
          <span>Due {formatDate(task.dueDate)}</span>
        </div>
      </div>

      <div className="task-item__actions">
        <button
          type="button"
          onClick={() => onToggleComplete?.(task)}
          disabled={isCompleted}
        >
          {isCompleted ? 'Completed' : 'Complete'}
        </button>
        <button type="button" onClick={() => onEdit?.(task)}>
          Edit
        </button>
        <button
          className="danger-button"
          type="button"
          onClick={() => onDelete?.(task)}
        >
          Delete
        </button>
      </div>
    </article>
  )
}

export default TaskItem
