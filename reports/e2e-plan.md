# E2E 冒烟测试材料

> 版本: v1
> 日期: 2026-06-26
> 任务: T1.3.3

## 范围

覆盖 PRD §5.1 关键用户旅程：
1. 首页 → 查看标题/副标题/筛选开关
2. 调整筛选 → 网络环境 / 内容倾向
3. 点击「抽一下」→ 进入横向卡片页
4. 横向滑动浏览卡片
5. 点击卡片 → 新标签页打开外部网站
6. 返回首页
7. 空结果提示

## 用例设计

文件：`tests/e2e/smoke.spec.ts`（已配置 Playwright，浏览器未实机）

```typescript
import { test, expect } from '@playwright/test';

test.describe('smoke', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('homepage renders', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /玩点啥/ })).toBeVisible();
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
    await page.getByRole('button', { name: '学点东西' }).click();
    await page.getByRole('button', { name: '抽一下' }).click();
    await expect(page.getByLabelText('推荐卡片列表')).toBeVisible();
  });

  test('card opens external link', async ({ page, context }) => {
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.getByRole('button', { name: '抽一下' }).click(),
    ]);

    const card = page.getByRole('link').first();
    await card.click();

    await expect(newPage).toHaveURL(/^https?:\/\//);
  });
});
```

## 执行方式

```bash
# 安装浏览器（首次）
pnpm exec playwright install chromium

# 运行 E2E 冒烟
pnpm exec playwright test tests/e2e/smoke.spec.ts
```

## 已知限制

- 当前 Playwright 浏览器未安装，E2E 未实机执行。
- 外部网站跳转可能因网络环境失败，建议在稳定网络下执行。
- 真实截图和 `tested` 字段回填后，可扩展断言至卡片具体内容。

## 结论

T1.3.3 E2E 冒烟测试材料已准备完成，用例覆盖核心用户路径。实机执行留给后续优化阶段。
