export function filterTasks(tasks, { searchQuery = "", status = "all", priority = "all" }) {
  const query = searchQuery.trim().toLowerCase();
  return tasks.filter((task) => {
    const matchesSearch = !query || task.title.toLowerCase().includes(query);
    const matchesStatus = status === "all" || task.status === status;
    const matchesPriority = priority === "all" || task.priority === priority;
    return matchesSearch && matchesStatus && matchesPriority;
  });
}

export function sortTasks(tasks, sortBy = "createdAt") {
  const copy = [...tasks]; // never mutate the original array!
  switch (sortBy) {
    case "dueDate":
      return copy.sort((a, b) => (a.dueDate > b.dueDate ? 1 : -1));
    case "priority": {
      const order = { high: 0, medium: 1, low: 2 };
      return copy.sort((a, b) => (order[a.priority] ?? 9) - (order[b.priority] ?? 9));
    }
    default:
      return copy.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)); // newest first
  }
}
export function getTaskStats(tasks) {
  const today = new Date().toISOString().slice(0, 10);
  const total = tasks.length;
  const todo = tasks.filter((t) => t.status === "todo").length;
  const inProgress = tasks.filter((t) => t.status === "in-progress").length;
  const completed = tasks.filter((t) => t.status === "completed").length;
  const overdue = tasks.filter((t) => t.status !== "completed" && t.dueDate < today).length;
  const completionPercentage = total ? Math.round((completed / total) * 100) : 0;
  return { total, todo, inProgress, completed, overdue, completionPercentage };
}
