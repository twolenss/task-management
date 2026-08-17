import { useCallback, useEffect, useState } from "react";
import { createTask, getTasks, updateTask, deleteTask } from "../services/taskService";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
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
  }, []);
  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const data = await getTasks();
        if (!ignore) setTasks(Array.isArray(data) ? data : []);
      } catch (error) {
        if (!ignore) setError(error.message || "An error occurred while fetching tasks.");
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }
    load();
    return () => {
      ignore = true;
    };
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
