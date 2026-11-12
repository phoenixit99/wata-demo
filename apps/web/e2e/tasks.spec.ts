import { expect, test } from '@playwright/test';

// TC đặt tên theo quy trình: TC-<issue>-<n>. Đây là test nền có trước các issue demo.
test('thêm, đánh dấu xong và giữ dữ liệu sau khi tải lại', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Chưa có công việc nào.')).toBeVisible();

  await page.getByLabel('Công việc mới').fill('Chuẩn bị demo');
  await page.getByRole('button', { name: 'Thêm' }).click();
  await page.getByRole('checkbox', { name: 'Chuẩn bị demo' }).check();

  await page.reload();
  await expect(page.getByRole('checkbox', { name: 'Chuẩn bị demo' })).toBeChecked();
});

test('báo lỗi khi tên công việc rỗng', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Thêm' }).click();
  await expect(page.getByRole('alert')).toHaveText('Tên công việc không được để trống');
});
