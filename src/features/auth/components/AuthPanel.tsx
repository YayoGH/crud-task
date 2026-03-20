import { useState, type FormEvent } from "react";
import { useAuth } from "../useAuth";

type AuthMode = "signin" | "signup";

type AuthPanelProps = {
  mode?: AuthMode;
  onModeChange?: (nextMode: AuthMode) => void;
};

export function AuthPanel({ mode, onModeChange }: AuthPanelProps) {
  const { signIn, signUp } = useAuth();
  const [internalMode, setInternalMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const currentMode = mode ?? internalMode;

  function updateMode(nextMode: AuthMode) {
    if (mode === undefined) {
      setInternalMode(nextMode);
    }
    onModeChange?.(nextMode);
  }

  const buttonText = currentMode === "signin" ? "Entrar" : "Crear cuenta";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);
    setMessage(null);

    if (!email.trim() || password.length < 6) {
      setError("Ingresa email valido y una clave de al menos 6 caracteres.");
      return;
    }

    try {
      setSubmitting(true);

      if (currentMode === "signin") {
        await signIn(email.trim(), password);
        setMessage("Sesion iniciada.");
      } else {
        await signUp(email.trim(), password);
        setMessage("Cuenta creada. Revisa tu correo si se solicita confirmacion.");
      }
    } catch (submitError) {
      const nextError =
        submitError instanceof Error
          ? submitError.message
          : "No se pudo completar la autenticacion.";
      setError(nextError);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="panel auth-panel" aria-labelledby="auth-title">
      <h2 id="auth-title">Acceso</h2>
      <p className="subtitle">Inicia sesion para gestionar tus tareas con seguridad RLS.</p>
      <div className="auth-switch" role="tablist" aria-label="Modo de autenticacion">
        <button
          type="button"
          className={currentMode === "signin" ? "toggle active" : "toggle"}
          onClick={() => updateMode("signin")}
          aria-pressed={currentMode === "signin"}
        >
          Ingresar
        </button>
        <button
          type="button"
          className={currentMode === "signup" ? "toggle active" : "toggle"}
          onClick={() => updateMode("signup")}
          aria-pressed={currentMode === "signup"}
        >
          Registrarme
        </button>
      </div>

      <form className="stack-form" onSubmit={handleSubmit}>
        <label className="field">
          <span>Email</span>
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label className="field">
          <span>Clave</span>
          <input
            type="password"
            autoComplete={currentMode === "signin" ? "current-password" : "new-password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength={6}
            required
          />
        </label>
        <button type="submit" disabled={submitting} className="btn btn-primary">
          {submitting ? "Procesando..." : buttonText}
        </button>
      </form>

      {error ? (
        <p className="feedback error" role="alert" aria-live="assertive">
          {error}
        </p>
      ) : null}
      {message ? (
        <p className="feedback ok" role="status" aria-live="polite">
          {message}
        </p>
      ) : null}
    </section>
  );
}
