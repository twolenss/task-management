import "./App.css";
import { useState, useMemo } from "react";
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
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const visibleTasks = useMemo(
    () => sortTasks(filterTasks(tasks, { searchQuery, status: selectedStatus, priority: selectedPriority }), sortBy),
    [tasks, searchQuery, selectedStatus, selectedPriority, sortBy],
  );

  const hasActiveFilters = searchQuery.trim() !== "" || selectedStatus !== "all" || selectedPriority !== "all";
  const stats = getTaskStats(tasks);
  return (
    <main className="app-main">
      <div className="stats-comp">
        <TaskStats stats={stats} />
      </div>
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
      <div className="form-comp">
        <TaskForm
          key={editingTask?.id ?? "new"}
          task={editingTask}
          createTaskHandler={createTaskHandler}
          updateTaskHandler={updateTaskHandler}
          onCancel={() => setEditingTask(null)}
        />
      </div>
      <div className="list-comp">
        <TaskList
          tasks={visibleTasks}
          error={error}
          isLoading={isLoading}
          onEdit={setEditingTask}
          onDelete={setTaskToDelete}
          completeTaskHandler={completeTaskHandler}
          refetch={refetch}
          emptyTitle={hasActiveFilters ? "No matches" : "No tasks found"}
          emptyMessage={hasActiveFilters ? "No tasks match your search or filters." : "Create a task..."}
        />
      </div>{" "}
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
    </main>
  );
}

export default App;
