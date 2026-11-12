import { describe, expect, it } from 'vitest';
import { addTask, loadTasks, MAX_TITLE_LENGTH, removeTask, saveTasks, toggleTask, type Task } from './tasks';

const now = new Date('2026-11-12T08:00:00Z');
const sample: Task[] = [{ id: 'a', title: 'Viết báo cáo', done: false, createdAt: now.toISOString() }];

describe('addTask', () => {
  it('thêm công việc, cắt khoảng trắng hai đầu', () => {
    const r = addTask([], '  Mua sữa  ', now, 'x');
    expect(r).toEqual({ ok: true, tasks: [{ id: 'x', title: 'Mua sữa', done: false, createdAt: now.toISOString() }] });
  });
  it('từ chối tên rỗng', () => {
    expect(addTask([], '   ')).toEqual({ ok: false, error: 'Tên công việc không được để trống' });
  });
  it('từ chối tên quá dài', () => {
    expect(addTask([], 'a'.repeat(MAX_TITLE_LENGTH + 1)).ok).toBe(false);
    expect(addTask([], 'a'.repeat(MAX_TITLE_LENGTH)).ok).toBe(true);
  });
});

describe('toggleTask / removeTask', () => {
  it('đảo trạng thái hoàn thành', () => {
    expect(toggleTask(sample, 'a')[0].done).toBe(true);
    expect(toggleTask(toggleTask(sample, 'a'), 'a')[0].done).toBe(false);
  });
  it('xoá theo id', () => {
    expect(removeTask(sample, 'a')).toEqual([]);
    expect(removeTask(sample, 'zzz')).toEqual(sample);
  });
});

describe('loadTasks / saveTasks', () => {
  it('lưu rồi đọc lại', () => {
    const mem = new Map<string, string>();
    const storage = { getItem: (k: string) => mem.get(k) ?? null, setItem: (k: string, v: string) => void mem.set(k, v) };
    saveTasks(sample, storage);
    expect(loadTasks(storage)).toEqual(sample);
  });
  it('dữ liệu hỏng thì trả mảng rỗng', () => {
    expect(loadTasks({ getItem: () => '{not json' })).toEqual([]);
  });
});
