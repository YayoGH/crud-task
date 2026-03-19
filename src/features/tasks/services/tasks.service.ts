import { supabase } from "../../../lib/supabase/client";
import type { Task, TaskInput, TaskUpdateInput } from "../types";

type DbTaskInsert = {
  user_id: string;
  title: string;
  description: string | null;
  due_date: string | null;
};

type DbTaskUpdate = {
  title?: string;
  description?: string | null;
  due_date?: string | null;
  is_completed?: boolean;
};

export async function fetchTasks() {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data ?? []) as Task[];
}

export async function createTask(userId: string, input: TaskInput) {
  const payload: DbTaskInsert = {
    user_id: userId,
    title: input.title.trim(),
    description: normalizeOptional(input.description),
    due_date: normalizeDate(input.dueDate),
  };

  const { data, error } = await supabase
    .from("tasks")
    .insert(payload)
    .select("*")
    .single();

  if (error) throw error;

  return data as Task;
}

export async function updateTask(taskId: string, input: TaskUpdateInput) {
  const payload: DbTaskUpdate = {
    title: input.title?.trim(),
    description:
      input.description === undefined
        ? undefined
        : normalizeOptional(input.description),
    due_date: input.dueDate === undefined ? undefined : normalizeDate(input.dueDate),
    is_completed: input.isCompleted,
  };

  const { data, error } = await supabase
    .from("tasks")
    .update(payload)
    .eq("id", taskId)
    .select("*")
    .single();

  if (error) throw error;

  return data as Task;
}

export async function deleteTask(taskId: string) {
  const { error } = await supabase.from("tasks").delete().eq("id", taskId);

  if (error) throw error;
}

function normalizeOptional(value?: string) {
  const nextValue = value?.trim();
  return nextValue ? nextValue : null;
}

function normalizeDate(value?: string) {
  const nextValue = value?.trim();
  if (!nextValue) return null;

  const parsedDate = new Date(nextValue);
  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return parsedDate.toISOString();
}
