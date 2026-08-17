import { useEffect, useState } from 'react'

const INITIAL_FORM = {
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  dueDate: '',
}

function TaskForm({
  task,
  onSubmit,
  onCancel,
  isSubmitting = false,
  createTaskHandler,
}) {
  const formData = { ...INITIAL_FORM, ...task }
  const formKey = task?.id ?? 'new-task'

  async function handleSubmit(event) {
    event.preventDefault()

    onSubmit?.({
      ...task,
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
    })
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label>
        <span>Title</span>
        <input
          type="text"
          value={formData.title}
          onChange={(event) => updateField('title', event.target.value)}
          required
        />
      </label>

      <label>
        <span>Description</span>
        <textarea
          value={formData.description}
          onChange={(event) => updateField('description', event.target.value)}
          rows="4"
        />
      </label>

      <div className="task-form__row">
        <label>
          <span>Status</span>
          <select
            value={formData.status}
            onChange={(event) => updateField('status', event.target.value)}
            required
          >
            <option value="todo">To do</option>
            <option value="in-progress">In progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>

        <label>
          <span>Priority</span>
          <select
            value={formData.priority}
            onChange={(event) => updateField('priority', event.target.value)}
            required
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>

        <label>
          <span>Due date</span>
          <input
            type="date"
            value={formData.dueDate}
            onChange={(event) => updateField('dueDate', event.target.value)}
          />
        </label>
      </div>

      <div className="task-form__actions">
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button className="primary-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save task'}
        </button>
      </div>
    </form>
  )
}

export default TaskForm
