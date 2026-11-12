// Nghiệp vụ thuần của app quản lý công việc: không phụ thuộc React, dễ test.

export interface Task {
  id: string;
  title: string;
  done: boolean;
  createdAt: string; // ISO
}

export const MAX_TITLE_LENGTH = 120;

export type AddResult = { ok: true; tasks: Task[] } | { ok: false; error: string };

export function addTask(tasks: Task[], rawTitle: string, now = new Date(), id: string = crypto.randomUUID()): AddResult {
  const title = rawTitle.trim();
  if (title.length === 0) return { ok: false, error: 'Tên công việc không được để trống' };
  if (title.length > MAX_TITLE_LENGTH) {
    return { ok: false, error: `Tên công việc tối đa ${MAX_TITLE_LENGTH} ký tự` };
  }
  return { ok: true, tasks: [...tasks, { id, title, done: false, createdAt: now.toISOString() }] };
}

export function toggleTask(tasks: Task[], id: string): Task[] {
  return tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
}

export function removeTask(tasks: Task[], id: string): Task[] {
  return tasks.filter((t) => t.id !== id);
}

const STORAGE_KEY = 'wata-demo.tasks';

export function loadTasks(storage: Pick<Storage, 'getItem'> = localStorage): Task[] {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as Task[]) : [];
  } catch {
    return [];
  }
}

export function saveTasks(tasks: Task[], storage: Pick<Storage, 'setItem'> = localStorage): void {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // Bộ nhớ trình duyệt bị chặn: bỏ qua, app vẫn chạy trong phiên.
  }
}
