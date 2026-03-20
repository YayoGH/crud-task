import { useMemo, useState } from "react";
import { useAuth } from "../../auth/useAuth";
import { useTasks } from "../hooks/useTasks";
import { TaskFilters, type TaskFilter } from "./TaskFilters";
import { TaskForm } from "./TaskForm";
import { TaskList } from "./TaskList";

export function TasksView() {
  const { user } = useAuth();
  const [filter, setFilter] = useState<TaskFilter>("all");
  const {
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
  } = useTasks(Boolean(user));

  const filteredTasks = useMemo(() => {
    if (filter === "pending") return tasks.filter((task) => !task.is_completed);
    if (filter === "completed") return tasks.filter((task) => task.is_completed);
    return tasks;
  }, [filter, tasks]);

  const pendingCount = useMemo(
    () => tasks.filter((task) => !task.is_completed).length,
    [tasks]
  );
  const completedCount = useMemo(
    () => tasks.filter((task) => task.is_completed).length,
    [tasks]
  );

  const emptyMessage =
    tasks.length === 0
      ? "Aun no hay tareas. Crea la primera para comenzar."
      : filter === "pending"
        ? "No hay tareas pendientes."
        : filter === "completed"
          ? "Aun no hay tareas completadas."
          : "No hay tareas para mostrar.";

  async function handleCreateTask(input: { title: string; description?: string; dueDate?: string }) {
    if (!user) return;
    await addTask(user.id, input);
  }

  async function handleEditTask(taskId: string, input: { title: string; description?: string; dueDate?: string }) {
    await editTask(taskId, input);
  }

  async function handleToggleComplete(taskId: string, isCompleted: boolean) {
    await toggleTaskCompletion(taskId, isCompleted);
  }

  async function handleDeleteTask(taskId: string) {
    await removeTask(taskId);
  }

  const showCriticalError = Boolean(error) && !loading && tasks.length === 0;

  return (
    <div className="tasks-layout" aria-busy={loading || mutating}>
      <section className="panel">
        <div className="task-hero-row">
          <div>
            <h2>Nueva tarea</h2>
            <p className="subtitle">Crea, edita y elimina tus tareas del dia.</p>
          </div>
        </div>

        <TaskForm
          submitLabel="Crear tarea"
          busy={mutating}
          onSubmit={handleCreateTask}
        />

        {error ? (
          <div className="feedback-row" role="alert" aria-live="assertive">
            <p className="feedback error">{error}</p>
            <button type="button" className="btn" onClick={clearError}>
              Ocultar
            </button>
          </div>
        ) : null}
      </section>

      <TaskFilters
        value={filter}
        allCount={tasks.length}
        pendingCount={pendingCount}
        completedCount={completedCount}
        onChange={setFilter}
      />

      {showCriticalError ? (
        <section className="panel" role="alert" aria-live="assertive">
          <h2>Error al cargar tareas</h2>
          <p className="subtitle">
            Ocurrio un problema al consultar tus tareas. Verifica tu conexion e intenta de
            nuevo.
          </p>
          <div className="row-actions row-spacing-top">
            <button type="button" className="btn btn-primary" onClick={() => void reload()}>
              Reintentar
            </button>
          </div>
        </section>
      ) : loading ? (
        <section className="panel">
          <h2>Cargando tareas</h2>
          <div className="loading-list" aria-hidden="true">
            <div className="loading-line" />
            <div className="loading-line" />
            <div className="loading-line" />
          </div>
        </section>
      ) : (
        <TaskList
          tasks={filteredTasks}
          busy={mutating}
          emptyMessage={emptyMessage}
          onEdit={handleEditTask}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDeleteTask}
        />
      )}

      <div className="row-actions">
        <button type="button" className="btn" onClick={() => void reload()} disabled={loading}>
          Refrescar lista
        </button>
      </div>
    </div>
  );
}
