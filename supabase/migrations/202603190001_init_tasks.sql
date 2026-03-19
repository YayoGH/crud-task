-- Phase 2: Data and Security foundation
-- Creates tasks table, indexes, updated_at automation, and RLS policies.

create extension if not exists pgcrypto;

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  is_completed boolean not null default false,
  due_date timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint tasks_title_not_blank check (char_length(trim(title)) > 0)
);

create index if not exists tasks_user_id_idx
  on public.tasks (user_id);

create index if not exists tasks_user_id_is_completed_idx
  on public.tasks (user_id, is_completed);

create index if not exists tasks_due_date_idx
  on public.tasks (due_date);

create or replace function public.set_tasks_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists tasks_set_updated_at on public.tasks;

create trigger tasks_set_updated_at
before update on public.tasks
for each row
execute procedure public.set_tasks_updated_at();

alter table public.tasks enable row level security;
alter table public.tasks force row level security;

drop policy if exists "Users can read own tasks" on public.tasks;
create policy "Users can read own tasks"
on public.tasks
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert own tasks" on public.tasks;
create policy "Users can insert own tasks"
on public.tasks
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can update own tasks" on public.tasks;
create policy "Users can update own tasks"
on public.tasks
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete own tasks" on public.tasks;
create policy "Users can delete own tasks"
on public.tasks
for delete
to authenticated
using (auth.uid() = user_id);
