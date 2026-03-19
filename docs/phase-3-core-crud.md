# Phase 3: Core CRUD

This phase implements the first end-to-end task workflows in the frontend.

## What was added

- Authentication gate for users (`sign in`, `sign up`, `sign out`).
- Task create flow with title validation and optional description/due date.
- Task read flow (list current user tasks from Supabase).
- Task update flow (inline edit per task item).
- Task delete flow with confirmation dialog.
- Loading/error/success feedback in UI for async operations.

## Key files

- `src/features/auth/AuthProvider.tsx`
- `src/features/auth/components/AuthPanel.tsx`
- `src/features/tasks/hooks/useTasks.ts`
- `src/features/tasks/services/tasks.service.ts`
- `src/features/tasks/components/TaskForm.tsx`
- `src/features/tasks/components/TaskList.tsx`
- `src/features/tasks/components/TaskItem.tsx`
- `src/features/tasks/components/TasksView.tsx`
- `src/app/App.tsx`

## Why auth is part of this phase

The database now enforces row-level security for authenticated users only.
Without a session, CRUD actions are rejected by policy.

## Notes

- Completion toggle and filters are intentionally reserved for Phase 4.
- Runtime requires `.env` with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
