# Phase 2: Data and Security

This phase sets the database baseline for the MVP task manager.

## What is included

- `tasks` table with ownership (`user_id`) tied to `auth.users`.
- Minimal fields for CRUD + completion workflow.
- Performance indexes for common filters.
- `updated_at` trigger for automatic update timestamps.
- Row Level Security (RLS) policies scoped to task owner.

## Migration file

- `supabase/migrations/202603190001_init_tasks.sql`

## How to apply

If you are using Supabase CLI:

1. Link your project:
   - `supabase link --project-ref <your-project-ref>`
2. Push migrations:
   - `supabase db push`

If you are using Supabase Dashboard:

1. Open SQL Editor.
2. Paste the migration content.
3. Run the query.

## Security expectations after applying

- Authenticated users can only select/insert/update/delete rows where `tasks.user_id = auth.uid()`.
- Unauthenticated requests cannot access task rows.
- Authorization is enforced in Postgres via RLS, not only in the frontend.
