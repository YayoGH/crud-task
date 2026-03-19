import { TaskItem } from "./TaskItem";
import type { Task, TaskInput } from "../types";

type TaskListProps = {
  tasks: Task[];
  busy?: boolean;
  emptyMessage?: string;
  onEdit: (taskId: string, input: TaskInput) => Promise<void>;
  onToggleComplete: (taskId: string, isCompleted: boolean) => Promise<void>;
  onDelete: (taskId: string) => Promise<void>;
};

export function TaskList({
  tasks,
  busy = false,
  emptyMessage = "Aun no hay tareas. Crea la primera para comenzar.",
  onEdit,
  onToggleComplete,
  onDelete,
}: TaskListProps) {
  if (!tasks.length) {
    return (
      <section className="panel">
        <h2>Tareas</h2>
        <p className="subtitle">{emptyMessage}</p>
      </section>
    );
  }

  return (
    <section className="panel">
      <div className="list-header">
        <h2>Tareas</h2>
        <p className="subtitle">{tasks.length} registradas</p>
      </div>

      <ul className="task-list" aria-label="Listado de tareas">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            busy={busy}
            onEdit={onEdit}
            onToggleComplete={onToggleComplete}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </section>
  );
}
