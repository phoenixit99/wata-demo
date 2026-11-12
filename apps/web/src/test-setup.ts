import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => cleanup());

// Node 22+ có localStorage riêng (cần --localstorage-file), có thể che mất localStorage của jsdom.
// Dùng bộ nhớ trong RAM để test chạy giống nhau trên mọi phiên bản Node.
if (typeof globalThis.localStorage?.clear !== 'function') {
  const mem = new Map<string, string>();
  const storage: Storage = {
    get length() { return mem.size; },
    clear: () => mem.clear(),
    getItem: (k) => mem.get(k) ?? null,
    key: (i) => [...mem.keys()][i] ?? null,
    removeItem: (k) => void mem.delete(k),
    setItem: (k, v) => void mem.set(k, String(v)),
  };
  Object.defineProperty(globalThis, 'localStorage', { value: storage, configurable: true });
}
