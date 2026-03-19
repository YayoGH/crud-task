import { useState, type FormEvent } from "react";
import type { TaskInput } from "../types";

type TaskFormProps = {
  submitLabel: string;
  busy?: boolean;
  initialValue?: {
    title?: string;
    description?: string;
    dueDate?: string;
  };
  onSubmit: (input: TaskInput) => Promise<void>;
  onCancel?: () => void;
};

export function TaskForm({
  submitLabel,
  busy = false,
  initialValue,
  onSubmit,
  onCancel,
}: TaskFormProps) {
  const [title, setTitle] = useState(initialValue?.title ?? "");
  const [description, setDescription] = useState(initialValue?.description ?? "");
  const [dueDate, setDueDate] = useState(initialValue?.dueDate ?? "");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim()) {
      setError("El titulo es obligatorio.");
      return;
    }

    setError(null);

    try {
      await onSubmit({ title, description, dueDate });
      if (!initialValue) {
        setTitle("");
        setDescription("");
        setDueDate("");
      }
    } catch {
      setError("No se pudo guardar la tarea. Intenta de nuevo.");
    }
  }

  return (
    <form className="stack-form" onSubmit={handleSubmit}>
      <label className="field">
        <span>Titulo</span>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          maxLength={180}
          required
        />
      </label>

      <label className="field">
        <span>Descripcion</span>
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows={3}
          maxLength={1200}
        />
      </label>

      <label className="field">
        <span>Fecha limite</span>
        <input
          type="datetime-local"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
        />
      </label>

      <div className="row-actions">
        <button type="submit" className="btn btn-primary" disabled={busy}>
          {busy ? "Guardando..." : submitLabel}
        </button>
        {onCancel ? (
          <button type="button" className="btn" onClick={onCancel} disabled={busy}>
            Cancelar
          </button>
        ) : null}
      </div>

      {error ? <p className="feedback error">{error}</p> : null}
    </form>
  );
}
