import "./App.css";
import TaskStats from "./components/TaskStats";
import TaskToolbar from "./components/TaskToolbar";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import useTasks from "./hooks/useTasks";

function App() {
  const { tasks } = useTasks();
  return (
    <main className="app-main">
      <div className="stats-comp">
        <TaskStats />
      </div>
      <div className="toolbar-comp">
        <TaskToolbar />
      </div>
      <div className="form-comp">
        <TaskForm />
      </div>
      <div className="list-comp">
        <TaskList tasks={tasks} />
      </div>{" "}
    </main>
  );
}

export default App;
