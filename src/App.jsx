import "./App.css";
import { useState } from "react";
import TaskStats from "./components/TaskStats";
import TaskToolbar from "./components/TaskToolbar";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import ConfirmDialog from "./components/ConfirmDialog";
import useTasks from "./hooks/useTasks";

function App() {
  const { tasks ,error , isLoading , createTaskHandler, updateTaskHandler, deleteTaskHandler,completeTaskHandler, refetch } = useTasks();
  const [editingTask, setEditingTask] = useState(null); 
  const [taskToDelete, setTaskToDelete] = useState(null)
  return (
    <main className="app-main">
      <div className="stats-comp">
        <TaskStats />
      </div>
      <div className="toolbar-comp">
        <TaskToolbar />
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
          tasks={tasks}
          error={error}
          isLoading={isLoading}
          onEdit={setEditingTask}
          onDelete={setTaskToDelete}
          completeTaskHandler={completeTaskHandler}
          refetch={refetch}
        />
      </div>{" "}
      <ConfirmDialog
        isOpen={!!taskToDelete}
        title="Delete task?"
        message={`Are you sure you want to delete "${taskToDelete?.title}"?`}
        confirmLabel="Delete"
        onCancel={() => setTaskToDelete(null)}
        onConfirm={() => {
          deleteTaskHandler(taskToDelete.id);
          setTaskToDelete(null);
        }}
      />
    </main>
  );
}

export default App;
