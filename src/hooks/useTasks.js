import { useEffect, useState } from "react";
import { createTask, getTasks, updateTask, deleteTask } from "../services/taskService";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTasks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getTasks();
      setTasks(Array.isArray(data) ? data : []);
    } catch (error) {
      setError(error.message || "An error occurred while fetching tasks.");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  const createTaskHandler = async (task) => {
    const createdTask = await createTask(task);
    setTasks((prevTasks) => [...prevTasks, createdTask]);

    return createdTask;
  };
  const updateTaskHandler = async (task, id) => {
    const upd = await updateTask(task, id);
    setTasks((prev) => prev.map((e) => (e.id === id ? upd : e)));
    return upd;
  };

  const deleteTaskHandler = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((e) => e.id !== id));
  };
  const completeTaskHandler = async (task) => {
    const updated = await updateTask({ status: "completed" }, task.id);
    setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
  };
  return { tasks, error, isLoading, createTaskHandler, updateTaskHandler, deleteTaskHandler, completeTaskHandler, refetch: fetchTasks };
};

export default useTasks;
