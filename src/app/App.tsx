import { useState } from "react";
import { useAuth } from "../features/auth/useAuth";
import { AuthPanel } from "../features/auth/components/AuthPanel";
import { TasksView } from "../features/tasks/components/TasksView";

export function App() {
  const { user, loading, signOut } = useAuth();
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="topbar">
          <div>
            <p className="eyebrow">Portfolio Project</p>
            <h1>Task Agenda</h1>
          </div>
          {!loading && !user ? (
            <div className="topbar-actions" aria-label="Acciones de acceso">
              <button
                type="button"
                className={authMode === "signin" ? "btn btn-primary" : "btn"}
                onClick={() => setAuthMode("signin")}
              >
                Iniciar sesion
              </button>
              <button
                type="button"
                className={authMode === "signup" ? "btn btn-primary" : "btn"}
                onClick={() => setAuthMode("signup")}
              >
                Crear cuenta
              </button>
            </div>
          ) : null}
          {!loading && user ? (
            <div className="topbar-actions" aria-label="Acciones de sesion">
              <button type="button" className="btn" onClick={() => void signOut()}>
                Cerrar sesion
              </button>
            </div>
          ) : null}
        </div>
        <p className="subtitle">
          Organiza tu jornada con una vista clara, segura y enfocada en productividad.
        </p>
      </header>
      <main>
        {loading ? (
          <section className="panel" role="status" aria-live="polite">
            Cargando sesion...
          </section>
        ) : user ? (
          <TasksView />
        ) : (
          <AuthPanel mode={authMode} onModeChange={setAuthMode} />
        )}
      </main>
    </div>
  );
}
