# Agents.md

## 1. Project Overview

This project is a portfolio-grade web application for personal task management (agenda/to-do), built around a clean CRUD workflow.

Purpose:
- Help users capture, track, and complete daily tasks with minimal friction.
- Teach and demonstrate modern full-stack web practices using React + Supabase + PostgreSQL.
- Keep scope intentionally small (MVP) while maintaining professional architecture, security, and UX quality.

MVP scope:
- Create tasks
- View tasks
- Edit tasks
- Delete tasks
- Mark tasks as completed/uncompleted
- Basic filtering (all, pending, completed)

Out of scope for MVP:
- Subtasks
- Team collaboration/shared tasks
- External integrations (calendar, Slack, etc.)
- Advanced notifications
- Full offline mode

## 2. Tech Stack

- Frontend: **React**
  - Chosen for component-based architecture, ecosystem maturity, and portfolio relevance.
- Backend/BaaS: **Supabase**
  - Provides managed PostgreSQL, authentication, and security policies with low setup overhead.
- Database: **PostgreSQL** (via Supabase)
  - Reliable relational model, strong querying capabilities, and production-ready semantics.

Why this stack:
- Fast to build and iterate.
- Supports real-world patterns (auth, data ownership, policy-driven security).
- Balances simplicity for learning with scalability for future growth.

## 3. Architecture

Application type:
- **SPA (Single Page Application)** with React.

High-level layers:
- UI layer (React components/views)
- State/data layer (client-side data fetching + mutation handling)
- Backend services (Supabase Auth + Postgres + RLS)

Data flow:
1. User interacts with UI (create/edit/complete/delete).
2. React triggers a data operation through Supabase client.
3. Supabase validates access through RLS policies.
4. PostgreSQL persists data.
5. UI state is refreshed and feedback is shown (loading/success/error).

Security model:
- Each task is user-owned.
- Access control is enforced server-side through Row Level Security (RLS), not only in UI.

## 4. Data Model

Primary table: `tasks`

Core fields:
- `id` (uuid, primary key)
- `user_id` (uuid, owner reference to authenticated user)
- `title` (text, required)
- `description` (text, optional)
- `is_completed` (boolean, default `false`)
- `due_date` (date or timestamptz, optional)
- `created_at` (timestamptz, default `now()`)
- `updated_at` (timestamptz)

Relationship:
- One user -> many tasks (`user_id`).

Recommended indexes:
- `user_id`
- (`user_id`, `is_completed`)
- optional: `due_date`

## 5. Project Structure

Use a feature-oriented structure with clear boundaries.

Recommended layout:
- `src/app` -> app bootstrap, providers, routing, global shell
- `src/features/tasks` -> task domain (components, hooks, service logic)
- `src/components` -> reusable UI components
- `src/lib` -> shared libraries (Supabase client, validation helpers, utilities)
- `src/hooks` -> shared custom hooks
- `src/styles` -> global styles, theme tokens, design primitives

Conventions:
- Keep domain logic close to its feature.
- Avoid dumping all files by technical type only.
- Prefer small, focused modules with single responsibility.

## 6. Coding Guidelines

React:
- Keep components small and composable.
- Separate presentational concerns from business/data logic.
- Model async states explicitly: loading, empty, error, success.
- Validate user input before sending mutations.
- Avoid premature abstraction; extract only after repeated patterns appear.

Supabase/PostgreSQL:
- Enforce RLS from day one.
- Always scope queries/mutations to authenticated user ownership.
- Keep schema minimal but extensible.
- Use indexes for common filters and owner-based lookups.
- Do not expose sensitive keys/secrets in client code.

General quality:
- Prefer readability over cleverness.
- Use consistent naming and folder conventions.
- Keep commits small and task-focused.
- Document significant architectural decisions in project docs.

## 7. Development Workflow

Recommended implementation order:
1. Foundation setup
   - Initialize app shell, environment config, Supabase client, base styles.
2. Data and security
   - Create `tasks` table, constraints, indexes, and RLS policies.
3. Core CRUD
   - Build create, list, edit, delete flows with clear UI feedback.
4. Completion and filters
   - Add complete/uncomplete behavior and status filtering.
5. Robustness
   - Handle edge states (loading/empty/error), improve UX and accessibility.
6. Portfolio polish
   - Final documentation, deployment config, and demo-ready consistency.

Execution practices for agents:
- Read existing structure before adding files.
- Follow current conventions instead of introducing a parallel pattern.
- Make incremental changes; verify behavior after each meaningful step.
- When changing data behavior, ensure UI state stays consistent.

## 8. Constraints

- Do not break or bypass the feature-oriented structure.
- Keep MVP scope tight; avoid introducing non-essential features early.
- Prioritize simplicity, correctness, and maintainability over complexity.
- Do not rely on client-side checks for authorization; enforce via RLS.
- Avoid unnecessary dependencies and architectural over-engineering.
- Preserve accessibility basics (labels, keyboard access, visible focus, contrast).
- Keep UX predictable: clear confirmations for destructive actions and clear error messages.

## 9. Future Improvements

Planned enhancements after MVP stabilization:
- Task priorities and tags/categories
- Search and advanced sorting
- Subtasks
- Reminder/notification system
- Calendar-oriented views
- Realtime updates across sessions
- Pagination or virtualized lists for scale
- Stronger test coverage (unit/integration/e2e) and CI/CD pipeline

Scaling direction:
- Evolve from personal task manager to collaboration-capable productivity app while preserving a clean domain architecture.
