import { useState } from "react";
import { validateTask } from "../utils/validation";

const labelClass = "flex flex-col gap-1";
const spanClass = "text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide";
const inputClass = "w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-50 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition";
const selectClass = "w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition appearance-none cursor-pointer";
const errorClass = "text-xs text-red-500 dark:text-red-400 mt-0.5";

function TaskForm({ task, onCancel, createTaskHandler, updateTaskHandler }) {
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
  const [successMessage, setSuccessMessage] = useState("");
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
          createdAt: new Date().toISOString(),
        });
        setTaskTitle("");
        setTaskDescription("");
        setTaskStatus("");
        setTaskPriority("");
        setTaskDueDate("");
      }
      setFormErrors({});
      setSuccessMessage("Task saved!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="task-form flex flex-col gap-4" onSubmit={handleSubmit}>
      <label className={labelClass}>
        <span className={spanClass}>Title</span>
        <input name="title" type="text" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} required className={inputClass} placeholder="What needs to be done?" />
        {formErrors.title && <span className={errorClass}>{formErrors.title}</span>}
      </label>

      <label className={labelClass}>
        <span className={spanClass}>Description</span>
        <textarea
          name="description"
          rows="3"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Add details (optional)"
          className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-50 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition resize-none"
        />
        {formErrors.description && <span className={errorClass}>{formErrors.description}</span>}
      </label>

      <div className="task-form-row grid grid-cols-1 sm:grid-cols-3 gap-4">
        <label className={labelClass}>
          <span className={spanClass}>Status</span>
          <select name="status" value={taskStatus} required onChange={(e) => setTaskStatus(e.target.value)} className={selectClass}>
            <option value="">Choose status</option>
            {statusOptions.map((stat) => (
              <option key={stat} value={stat}>{stat}</option>
            ))}
          </select>
          {formErrors.status && <span className={errorClass}>{formErrors.status}</span>}
        </label>

        <label className={labelClass}>
          <span className={spanClass}>Priority</span>
          <select name="priority" value={taskPriority} required onChange={(e) => setTaskPriority(e.target.value)} className={selectClass}>
            <option value="">Choose priority</option>
            {priorityOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {formErrors.priority && <span className={errorClass}>{formErrors.priority}</span>}
        </label>

        <label className={labelClass}>
          <span className={spanClass}>Due date</span>
          <input name="dueDate" type="date" value={taskDueDate} onChange={(e) => setTaskDueDate(e.target.value)} min={today} className={inputClass} />
          {formErrors.dueDate && <span className={errorClass}>{formErrors.dueDate}</span>}
        </label>
      </div>
{successMessage && (
  <div className="text-sm text-emerald-600 dark:text-emerald-400 font-medium text-center py-1">
    {successMessage}
  </div>
)}

      <div className="flex items-center gap-3 pt-1">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 h-9 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
          >
            Cancel
          </button>
        )}
        <button
          className="primary-btn flex-1 h-9 rounded-lg bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400 text-white text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : task ? "Save Changes" : "Save Task"}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
