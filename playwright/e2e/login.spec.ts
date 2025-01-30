import { test, expect } from '@playwright/test';
import { BASE_URL } from '../playwright.config';
import { LoginPage } from '../fixtures/pages/login-page';
import { login } from '../utils/login';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto(page);
})

test.describe('Login Page', () => {
  test('Check baseURL application', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto(page);
   
  });

  test('validate error message when invalid credentials are entered', async ({ page }) => {
    await page.fill('[name="username"]', 'invaliduser@gmail.com');
    await page.fill('[name="password"]', 'passwordisnotvalid');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Invalid username or password')).toBeVisible();
  })

  test('should ensure that when user has logged that user is directed to the dashboard', async({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto(page);
    await login(page, 'testuser@gmail.com', 'password123');

    await expect(page).toHaveURL(BASE_URL +'dasboard');
  })

  test('should ensure that user when successfully logged in that session token is set', async({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto(page);
    await login(page, 'testuser@gmail.com', 'password123');

    const sessionToken = await page.evaluate(() => localStorage.getItem('sessionToken'));

    // Assert that the session token exists
    expect(sessionToken).toBeDefined();
    expect(sessionToken).not.toBeNull();
    expect(sessionToken).toBeTruthy();
  })

  test('should ensure that user is directed to Forgot password page when forget password link is clicked', async({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto(page);
    await page.click('text=Forgot password?');
    await expect(page).toHaveURL(BASE_URL+'auth/forgotpassword');
  })

  test('should ensure navigation to the update password page works', async({page}) => {
    await page.getByRole('button', { name: 'Navigate to Update Password' }).click();
    await expect(page).toHaveURL(BASE_URL+'auth/updatepassword');
  })

});
