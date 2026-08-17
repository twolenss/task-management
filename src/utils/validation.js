export function validateTask({ title, description, status, priority, dueDate }) {
  const errors = {};
  const today = new Date().toLocaleDateString("en-CA");

  if (!title || !title.trim()) {
    errors.title = "Title is required";
  }
  if (!description || !description.trim()) {
    errors.description = "Description is required";
  }
  if (!status) {
    errors.status = "Status is required";
  }
  if (!priority) {
    errors.priority = "Priority is required";
  }
  if (!dueDate) {
    errors.dueDate = "Due date is required";
  } else if (dueDate < today) {
    errors.dueDate = "Due date cannot be in the past";
  }
  return errors;
}
