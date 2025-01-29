import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test('Check baseURL application', async ({ page }) => {
    await page.goto('/dashboard');
    console.log('Current URL:', page.url());
  });
  test('should log in successfully', async ({ page,baseURL }) => {
    await page.goto('/dashboard');
    await page.fill('[name="username"]', 'testuser');
    await page.fill('[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/dashboard');
  });
});
