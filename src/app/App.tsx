import { useAuth } from "../features/auth/useAuth";
import { AuthPanel } from "../features/auth/components/AuthPanel";
import { TasksView } from "../features/tasks/components/TasksView";

export function App() {
  const { user, loading } = useAuth();

  return (
    <div className="app-shell">
      <header className="app-header">
        <p className="eyebrow">Portfolio Project</p>
        <h1>Task Agenda</h1>
      </header>
      <main>
        {loading ? (
          <section className="panel" role="status" aria-live="polite">
            Cargando sesion...
          </section>
        ) : user ? (
          <TasksView />
        ) : (
          <AuthPanel />
        )}
      </main>
    </div>
  );
}
