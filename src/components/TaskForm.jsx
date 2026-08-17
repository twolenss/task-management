import { useState } from "react";
function TaskForm({ task, onCancel, createTaskHandler, updateTaskHandler }) {
  // const formData = { ...INITIAL_FORM, ...task }
  // const formKey = task?.id ?? 'new-task'

  const [taskTitle, setTaskTitle] = useState(task?.title ?? "");
  const [taskDescription, setTaskDescription] = useState(task?.description ?? "");
  const [taskStatus, setTaskStatus] = useState(task?.status ?? "");
  const [taskPriority, setTaskPriority] = useState(task?.priority ?? "");
  const [taskDueDate, setTaskDueDate] = useState(task?.dueDate ?? "");
  const today = new Date().toLocaleDateString("en-CA");
  // const [formData, setFormData] = useState(formData)
  // const [isSubmitting, setIsSubmitting] = useState(false)
  const statusOptions = ["todo", "in-progress", "completed"];
  const priorityOptions = ["low", "medium", "high"];

  async function handleSubmit(event) {
    event.preventDefault();
    if (!taskTitle.trim() || !taskStatus || !taskPriority || !taskDueDate) {
      alert("Please fill in all required fields.");
      return;
    }
    const formData = {
      title: taskTitle.trim(),
      description: taskDescription.trim(),
      status: taskStatus,
      priority: taskPriority,
      dueDate: taskDueDate,
    };

    if (task) {
      await updateTaskHandler(formData, task.id);
      onCancel?.();
      return;
    }

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

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label>
        <span>Title</span>
        <input name="title" type="text" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} required />
      </label>

      <label>
        <span>Description</span>
        <textarea name="description" rows="4" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
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
        </label>

        <label>
          <span>Due date</span>
          <input name="dueDate" type="date" value={taskDueDate} onChange={(e) => setTaskDueDate(e.target.value)} min={today} />
        </label>
      </div>

      <button className="primary-btn" type="submit">
        {task ? "Save Changes" : "Save Task"}
      </button>
      {/* <div className="task-form__actions">
        {onCancel ? (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        ) : null}
        <button className="primary-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save task'}
        </button>
      </div> */}
    </form>
  );
}

export default TaskForm;
