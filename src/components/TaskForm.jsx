import { useState } from "react";
import { validateTask } from "../utils/validation";

function TaskForm({ task, onCancel, createTaskHandler, updateTaskHandler }) {
  // const formData = { ...INITIAL_FORM, ...task }
  // const formKey = task?.id ?? 'new-task'

  const [taskTitle, setTaskTitle] = useState(task?.title ?? "");
  const [taskDescription, setTaskDescription] = useState(task?.description ?? "");
  const [taskStatus, setTaskStatus] = useState(task?.status ?? "");
  const [taskPriority, setTaskPriority] = useState(task?.priority ?? "");
  const [taskDueDate, setTaskDueDate] = useState(task?.dueDate ?? "");
  const today = new Date().toLocaleDateString("en-CA");

  const statusOptions = ["todo", "in-progress", "completed"];
  const priorityOptions = ["low", "medium", "high"];
  const errors = validateTask({ title: taskTitle, status: taskStatus, priority: taskPriority, dueDate: taskDueDate });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  async function handleSubmit(event) {
    event.preventDefault();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    const formData = {
      title: taskTitle.trim(),
      description: taskDescription.trim(),
      status: taskStatus,
      priority: taskPriority,
      dueDate: taskDueDate,
    };

    setIsSubmitting(true);
    try {
      if (task) {
        await updateTaskHandler(formData, task.id);
        onCancel?.();
      } else {
        await createTaskHandler({
          ...formData,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        });
        setTaskTitle("");
        setTaskDescription("");
        setTaskStatus("");
        setTaskPriority("");
        setTaskDueDate("");
      }
      setFormErrors({});
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label>
        <span>Title</span>
        <input name="title" type="text" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} required />
        {formErrors.title && <span className="error">{formErrors.title}</span>}
      </label>

      <label>
        <span>Description</span>
        <textarea name="description" rows="4" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
        {formErrors.description && <span className="error">{formErrors.description}</span>}
      </label>

      <div className="task-form-row">
        <label>
          <span>Status</span>
          <select name="status" value={taskStatus} required onChange={(e) => setTaskStatus(e.target.value)}>
            <option value="">Choose status</option>
            {statusOptions.map((stat) => (
              <option key={stat} value={stat}>
                {stat}
              </option>
            ))}
          </select>
          {formErrors.status && <span className="error">{formErrors.status}</span>}
        </label>

        <label>
          <span>Priority</span>
          <select name="priority" value={taskPriority} required onChange={(e) => setTaskPriority(e.target.value)}>
            <option value="">Choose priority</option>
            {priorityOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {formErrors.priority && <span className="error">{formErrors.priority}</span>}
        </label>

        <label>
          <span>Due date</span>
          <input name="dueDate" type="date" value={taskDueDate} onChange={(e) => setTaskDueDate(e.target.value)} min={today} />
          {formErrors.dueDate && <span className="error">{formErrors.dueDate}</span>}
        </label>
      </div>

      <button className="primary-btn" type="submit" disabled={isSubmitting}>
        {task ? "Save Changes" : "Save Task"}
      </button>
    </form>
  );
}

export default TaskForm;
