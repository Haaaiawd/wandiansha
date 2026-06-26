import { test, expect } from '@playwright/test';

test.describe('smoke', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('homepage renders', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toContainText('玩点啥');
    await expect(page.getByRole('button', { name: '抽一下' })).toBeVisible();
    await expect(page.getByRole('group', { name: '网络环境' })).toBeVisible();
    await expect(page.getByRole('group', { name: '内容倾向' })).toBeVisible();
  });

  test('draw navigates to carousel', async ({ page }) => {
    await page.getByRole('button', { name: '抽一下' }).click();
    await expect(page.getByLabelText('推荐卡片列表')).toBeVisible();
  });

  test('filter changes work', async ({ page }) => {
    await page.getByRole('button', { name: '全部' }).click();
    await page.getByRole('button', { name: '有点收获' }).click();
    await page.getByRole('button', { name: '抽一下' }).click();
    await expect(page.getByLabelText('推荐卡片列表')).toBeVisible();
  });

  test('back button returns to home', async ({ page }) => {
    await page.getByRole('button', { name: '抽一下' }).click();
    await expect(page.getByLabelText('推荐卡片列表')).toBeVisible();

    await page.getByRole('button', { name: '返回' }).click();
    await expect(page.getByRole('button', { name: '抽一下' })).toBeVisible();
  });

  test('card opens external link in new tab', async ({ page, context }) => {
    await page.getByRole('button', { name: '抽一下' }).click();
    await expect(page.getByLabelText('推荐卡片列表')).toBeVisible();

    const card = page.getByRole('link').first();
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      card.click(),
    ]);

    await expect(newPage).toHaveURL(/^https?:\/\//);
  });
});
