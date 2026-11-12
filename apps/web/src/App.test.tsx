import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import App from './App';

beforeEach(() => localStorage.clear());

describe('App', () => {
  it('thêm, đánh dấu xong và xoá một công việc', async () => {
    const user = userEvent.setup();
    render(<App />);
    expect(screen.getByText('Chưa có công việc nào.')).toBeInTheDocument();

    await user.type(screen.getByLabelText('Công việc mới'), 'Họp sprint{Enter}');
    const checkbox = screen.getByRole('checkbox', { name: 'Họp sprint' });
    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    await user.click(screen.getByRole('button', { name: 'Xoá "Họp sprint"' }));
    expect(screen.queryByText('Họp sprint')).not.toBeInTheDocument();
  });

  it('báo lỗi khi tên rỗng', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'Thêm' }));
    expect(screen.getByRole('alert')).toHaveTextContent('Tên công việc không được để trống');
  });
});
