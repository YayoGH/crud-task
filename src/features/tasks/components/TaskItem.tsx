import { useMemo, useState } from "react";
import { TaskForm } from "./TaskForm";
import type { Task, TaskInput } from "../types";

type TaskItemProps = {
  task: Task;
  busy?: boolean;
  onEdit: (taskId: string, input: TaskInput) => Promise<void>;
  onToggleComplete: (taskId: string, isCompleted: boolean) => Promise<void>;
  onDelete: (taskId: string) => Promise<void>;
};

export function TaskItem({
  task,
  busy = false,
  onEdit,
  onToggleComplete,
  onDelete,
}: TaskItemProps) {
  const [editing, setEditing] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const initialDueDate = useMemo(() => {
    if (!task.due_date) return "";
    const date = new Date(task.due_date);
    if (Number.isNaN(date.getTime())) return "";

    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }, [task.due_date]);

  async function handleDelete() {
    const confirmed = window.confirm("Esta accion eliminara la tarea. Deseas continuar?");
    if (!confirmed) return;

    try {
      setActionError(null);
      await onDelete(task.id);
    } catch {
      setActionError("No se pudo eliminar la tarea.");
    }
  }

  async function handleToggleComplete() {
    try {
      setActionError(null);
      await onToggleComplete(task.id, !task.is_completed);
    } catch {
      setActionError("No se pudo cambiar el estado de la tarea.");
    }
  }

  if (editing) {
    return (
      <li className="task-card">
        <TaskForm
          submitLabel="Guardar cambios"
          busy={busy}
          initialValue={{
            title: task.title,
            description: task.description ?? "",
            dueDate: initialDueDate,
          }}
          onCancel={() => setEditing(false)}
          onSubmit={async (input) => {
            await onEdit(task.id, input);
            setEditing(false);
          }}
        />
      </li>
    );
  }

  return (
    <li className={task.is_completed ? "task-card completed" : "task-card"}>
      <div className="task-head">
        <div className="task-title-wrap">
          <h3>{task.title}</h3>
          <span className={task.is_completed ? "task-status done" : "task-status pending"}>
            {task.is_completed ? "Completada" : "Pendiente"}
          </span>
        </div>
        <div className="row-actions compact">
          <button
            type="button"
            className={task.is_completed ? "btn" : "btn btn-primary"}
            onClick={handleToggleComplete}
            disabled={busy}
            aria-pressed={task.is_completed}
            aria-label={
              task.is_completed
                ? `Marcar pendiente: ${task.title}`
                : `Marcar completada: ${task.title}`
            }
          >
            {task.is_completed ? "Marcar pendiente" : "Completar"}
          </button>
          <button type="button" className="btn" onClick={() => setEditing(true)}>
            Editar
          </button>
          <button type="button" className="btn btn-danger" onClick={handleDelete} disabled={busy}>
            Eliminar
          </button>
        </div>
      </div>

      {task.description ? <p className="task-description">{task.description}</p> : null}

      <div className="task-meta">
        <span>Creada: {formatDate(task.created_at)}</span>
        <span>
          Fecha limite: {task.due_date ? formatDate(task.due_date) : "Sin fecha"}
        </span>
      </div>

      {actionError ? <p className="feedback error">{actionError}</p> : null}
    </li>
  );
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Fecha invalida";

  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}
