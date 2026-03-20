# CRUD Task Agenda

Aplicacion web tipo agenda/todo para gestionar tareas personales con flujo CRUD completo.

## Objetivo

Este proyecto esta construido con enfoque de portafolio profesional para demostrar:

- Arquitectura frontend por features en React.
- Integracion real con Supabase (Auth + PostgreSQL).
- Seguridad por propietario de datos con Row Level Security (RLS).
- Buenas practicas de UX: estados de carga, vacio, error y feedback de acciones.

## Stack

- Frontend: React + TypeScript + Vite
- Backend/BaaS: Supabase
- Base de datos: PostgreSQL (Supabase)
- Estilos: CSS modular por secciones y tokens globales

## Funcionalidades MVP

- Registro e inicio de sesion
- Crear tareas
- Ver tareas
- Editar tareas
- Eliminar tareas
- Marcar tareas como completadas o pendientes
- Filtrar tareas (todas, pendientes, completadas)

## Seguridad

- La tabla `tasks` usa RLS obligatoria.
- Cada consulta/mutacion queda limitada al usuario autenticado (`auth.uid() = user_id`).
- La autorizacion se valida en base de datos, no solo en la UI.

## Estructura de proyecto

- `src/app` arranque de aplicacion y providers
- `src/features/auth` autenticacion
- `src/features/tasks` dominio de tareas (componentes, hooks, servicios)
- `src/lib/supabase` cliente Supabase
- `src/styles` tokens y estilos globales
- `supabase/migrations` migraciones SQL versionadas
- `docs` decisiones y fases del desarrollo

## Variables de entorno

Crea un archivo `.env` local usando `.env.example`:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_AUTH_REDIRECT_URL` (URL publica del frontend para confirmacion de email)

En Supabase (Authentication -> URL Configuration), agrega esa misma URL en `Redirect URLs`.

## Desarrollo local

```bash
npm install
npm run dev
```

## Verificacion de calidad

```bash
npm run lint
npm run build
```

## Deploy

Proyecto desplegado en Vercel con variables de entorno del entorno de Supabase.

Guia de despliegue: `docs/deployment-vercel.md`

## Documentacion interna

- `Agents.md`
- `docs/phase-2-data-security.md`
- `docs/phase-3-core-crud.md`
- `docs/phase-5-robustness.md`
- `docs/phase-6-portfolio-polish.md`
