import "./App.css";
import TaskStats from "./components/TaskStats";
import TaskToolbar from "./components/TaskToolbar";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import useTasks from "./hooks/useTasks";

function App({  }) {
  const { tasks ,error , isLoading , createTaskHandler, updateTaskHandler, deleteTaskHandler,completeTaskHandler } = useTasks();
  
  return (
    <main className="app-main">
      <div className="stats-comp">
        <TaskStats />
      </div>
      <div className="toolbar-comp">
        <TaskToolbar />
      </div>
      <div className="form-comp">
        <TaskForm tasks={tasks} createTaskHandler={createTaskHandler} /> 
      </div>
      <div className="list-comp">
        <TaskList tasks={tasks} error={error} isLoading={isLoading} updateTaskHandler={updateTaskHandler} deleteTaskHandler={deleteTaskHandler} completeTaskHandler={completeTaskHandler} />
      </div>{" "}
    </main>
  );
}

export default App;
