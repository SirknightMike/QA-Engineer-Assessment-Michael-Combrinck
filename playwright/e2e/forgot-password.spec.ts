import test, { expect } from "@playwright/test";
import { ForgotPasswordPage } from "../fixtures/pages/forgot-password-page";
import { BASE_URL } from "../playwright.config";

test.describe('Forgot Password Page', () => {

  test('should ensure all elements are visible', async ({ page }) => {
   const forgotPasswordPage = new ForgotPasswordPage(page);

   await forgotPasswordPage.goto(page);

   await expect(forgotPasswordPage.forgotPasswordLocators.heading).toBeVisible();
   await expect(forgotPasswordPage.forgotPasswordLocators.description).toBeVisible();
   await expect(forgotPasswordPage.forgotPasswordLocators.emailInput).toBeVisible();
   await expect(forgotPasswordPage.forgotPasswordLocators.submitButton).toBeVisible();
   await expect(forgotPasswordPage.forgotPasswordLocators.backButton).toBeVisible();
  });

  test('back button functionality works ', async ({ page }) => {
      const forgotPage = new ForgotPasswordPage(page);
      await forgotPage.goto(page);
      await page.click('text=Back');
      await expect(page).toHaveURL(BASE_URL+'login');
  })

  test('email input field validation works', async ({ page }) => {
    const forgotPage = new ForgotPasswordPage(page);
    await forgotPage.goto(page);
    await page.fill('[name="email"]', 'invalidemail');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Email must be a valid email address')).toBeVisible();
  })
 

});
