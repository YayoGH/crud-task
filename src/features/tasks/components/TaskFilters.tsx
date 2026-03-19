type TaskFilter = "all" | "pending" | "completed";

type TaskFiltersProps = {
  value: TaskFilter;
  allCount: number;
  pendingCount: number;
  completedCount: number;
  onChange: (nextFilter: TaskFilter) => void;
};

export function TaskFilters({
  value,
  allCount,
  pendingCount,
  completedCount,
  onChange,
}: TaskFiltersProps) {
  return (
    <section className="panel">
      <div className="list-header">
        <h2>Filtros</h2>
        <p className="subtitle">Visualiza tareas por estado</p>
      </div>

      <div className="filters-row" role="tablist" aria-label="Filtros de tareas">
        <button
          type="button"
          className={value === "all" ? "filter-chip active" : "filter-chip"}
          onClick={() => onChange("all")}
          aria-pressed={value === "all"}
        >
          Todas ({allCount})
        </button>
        <button
          type="button"
          className={value === "pending" ? "filter-chip active" : "filter-chip"}
          onClick={() => onChange("pending")}
          aria-pressed={value === "pending"}
        >
          Pendientes ({pendingCount})
        </button>
        <button
          type="button"
          className={value === "completed" ? "filter-chip active" : "filter-chip"}
          onClick={() => onChange("completed")}
          aria-pressed={value === "completed"}
        >
          Completadas ({completedCount})
        </button>
      </div>
    </section>
  );
}

export type { TaskFilter };
