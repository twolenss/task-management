import "./App.css";
import { useState, useMemo, useEffect } from "react";
import TaskStats from "./components/TaskStats";
import TaskToolbar from "./components/TaskToolbar";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import ConfirmDialog from "./components/ConfirmDialog";
import useTasks from "./hooks/useTasks";
import { filterTasks, sortTasks, getTaskStats } from "./utils/taskUtils";
function App() {
  const { tasks, error, isLoading, createTaskHandler, updateTaskHandler, deleteTaskHandler, completeTaskHandler, refetch } = useTasks();
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const visibleTasks = useMemo(
    () => sortTasks(filterTasks(tasks, { searchQuery, status: selectedStatus, priority: selectedPriority }), sortBy),
    [tasks, searchQuery, selectedStatus, selectedPriority, sortBy],
  );

  const hasActiveFilters = searchQuery.trim() !== "" || selectedStatus !== "all" || selectedPriority !== "all";
  const stats = getTaskStats(tasks);

  function handleEdit(task) {
    setEditingTask(task);
    setShowForm(true);
  }

  function handleCloseForm() {
    setEditingTask(null);
    setShowForm(false);
  }

  return (
    <div className="min-h-dvh bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-50">TaskFlow</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setDarkMode((d) => !d)}
              className="relative w-12 h-6 rounded-full bg-slate-200 dark:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              <div
                className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${darkMode ? "left-7" : "left-1"}`}
              />
            </button>
            <button
              type="button"
              onClick={() => { setEditingTask(null); setShowForm(true); }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
            >
              Add Task
            </button>
          </div>
        </div>
      </header>

      <main className="app-main max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Stats */}
        <div className="stats-comp">
          <TaskStats stats={stats} />
        </div>

        {/* Toolbar */}
        <div className="toolbar-comp">
          <TaskToolbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            selectedPriority={selectedPriority}
            onPriorityChange={setSelectedPriority}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </div>

        {/* Task List */}
        <div className="list-comp">
          <TaskList
            tasks={visibleTasks}
            error={error}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={setTaskToDelete}
            completeTaskHandler={completeTaskHandler}
            refetch={refetch}
            emptyTitle={hasActiveFilters ? "No matches" : "No tasks yet"}
            emptyMessage={hasActiveFilters ? "No tasks match your search or filters." : "Hit 'Add Task' to get started."}
          />
        </div>
      </main>

      {/* Task Form Modal */}
      {showForm && (
        <div className="form-comp fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={(e) => { if (e.target === e.currentTarget) handleCloseForm(); }}>
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transform transition-all duration-300 scale-100">
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50">
                {editingTask ? "Edit Task" : "New Task"}
              </h2>
              <button type="button" onClick={handleCloseForm} className="w-7 h-7 flex items-center justify-center rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-lg leading-none">
                ×
              </button>
            </div>
            <div className="px-6 py-5">
              <TaskForm
                key={editingTask?.id ?? "new"}
                task={editingTask}
                createTaskHandler={createTaskHandler}
                updateTaskHandler={updateTaskHandler}
                onCancel={handleCloseForm}
              />
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={!!taskToDelete}
        title="Delete task?"
        message={`Are you sure you want to delete "${taskToDelete?.title}"?`}
        confirmLabel="Delete"
        onCancel={() => setTaskToDelete(null)}
        onConfirm={() => {
          deleteTaskHandler(taskToDelete?.id);
          setTaskToDelete(null);
        }}
      />
    </div>
  );
}

export default App;
