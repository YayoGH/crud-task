import { useCallback, useEffect, useState } from "react";
import {
  createTask,
  deleteTask,
  fetchTasks,
  updateTask,
} from "../services/tasks.service";
import type { Task, TaskInput, TaskUpdateInput } from "../types";

type UseTasksResult = {
  tasks: Task[];
  loading: boolean;
  mutating: boolean;
  error: string | null;
  clearError: () => void;
  reload: () => Promise<void>;
  addTask: (userId: string, input: TaskInput) => Promise<void>;
  editTask: (taskId: string, input: TaskUpdateInput) => Promise<void>;
  toggleTaskCompletion: (taskId: string, isCompleted: boolean) => Promise<void>;
  removeTask: (taskId: string) => Promise<void>;
};

export function useTasks(enabled: boolean): UseTasksResult {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [mutating, setMutating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const reload = useCallback(async () => {
    if (!enabled) {
      setTasks([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const nextTasks = await fetchTasks();
      setTasks(nextTasks);
    } catch (loadError) {
      setError(getReadableError(loadError, "No se pudieron cargar las tareas."));
    } finally {
      setLoading(false);
    }
  }, [enabled]);

  useEffect(() => {
    void reload();
  }, [reload]);

  const addTask = useCallback(async (userId: string, input: TaskInput) => {
    try {
      setMutating(true);
      setError(null);
      const createdTask = await createTask(userId, input);
      setTasks((current) => [createdTask, ...current]);
    } catch (mutationError) {
      setError(getReadableError(mutationError, "No se pudo crear la tarea."));
      throw mutationError;
    } finally {
      setMutating(false);
    }
  }, []);

  const editTask = useCallback(async (taskId: string, input: TaskUpdateInput) => {
    try {
      setMutating(true);
      setError(null);
      const updatedTask = await updateTask(taskId, input);
      setTasks((current) =>
        current.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
    } catch (mutationError) {
      setError(getReadableError(mutationError, "No se pudo actualizar la tarea."));
      throw mutationError;
    } finally {
      setMutating(false);
    }
  }, []);

  const removeTask = useCallback(async (taskId: string) => {
    try {
      setMutating(true);
      setError(null);
      await deleteTask(taskId);
      setTasks((current) => current.filter((task) => task.id !== taskId));
    } catch (mutationError) {
      setError(getReadableError(mutationError, "No se pudo eliminar la tarea."));
      throw mutationError;
    } finally {
      setMutating(false);
    }
  }, []);

  const toggleTaskCompletion = useCallback(async (taskId: string, isCompleted: boolean) => {
    try {
      setMutating(true);
      setError(null);
      const updatedTask = await updateTask(taskId, { isCompleted });
      setTasks((current) =>
        current.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
    } catch (mutationError) {
      setError(
        getReadableError(mutationError, "No se pudo actualizar el estado de la tarea.")
      );
      throw mutationError;
    } finally {
      setMutating(false);
    }
  }, []);

  return {
    tasks,
    loading,
    mutating,
    error,
    clearError,
    reload,
    addTask,
    editTask,
    toggleTaskCompletion,
    removeTask,
  };
}

function getReadableError(error: unknown, fallback: string) {
  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return fallback;
}
