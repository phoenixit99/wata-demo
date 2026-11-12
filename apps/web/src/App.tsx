import { useEffect, useState, type FormEvent } from 'react';
import { addTask, loadTasks, removeTask, saveTasks, toggleTask, type Task } from './tasks';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks());
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => saveTasks(tasks), [tasks]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const result = addTask(tasks, title);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setTasks(result.tasks);
    setTitle('');
    setError(null);
  }

  return (
    <main className="app">
      <h1>Công việc của tôi</h1>

      <form onSubmit={onSubmit} className="add-form">
        <label htmlFor="new-task" className="sr-only">Công việc mới</label>
        <input
          id="new-task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Thêm công việc..."
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? 'new-task-error' : undefined}
        />
        <button type="submit">Thêm</button>
      </form>
      {error && <p id="new-task-error" role="alert" className="error">{error}</p>}

      {tasks.length === 0 ? (
        <p className="empty">Chưa có công việc nào.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((t) => (
            <li key={t.id} className={t.done ? 'done' : undefined}>
              <label>
                <input type="checkbox" checked={t.done} onChange={() => setTasks(toggleTask(tasks, t.id))} />
                <span>{t.title}</span>
              </label>
              <button type="button" aria-label={`Xoá "${t.title}"`} onClick={() => setTasks(removeTask(tasks, t.id))}>
                Xoá
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
