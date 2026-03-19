export type Task = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  is_completed: boolean;
  due_date: string | null;
  created_at: string;
  updated_at: string;
};

export type TaskInput = {
  title: string;
  description?: string;
  dueDate?: string;
};

export type TaskUpdateInput = {
  title?: string;
  description?: string;
  dueDate?: string;
  isCompleted?: boolean;
};
