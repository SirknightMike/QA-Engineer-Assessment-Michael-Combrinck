import test, { expect } from "@playwright/test";
import { Page404 } from "../fixtures/pages/404-page";
import { BASE_URL } from "../playwright.config";

test.beforeEach(async ({ page }) => {
    const page404 = new Page404(page);
    await page404.goto();
})

test.describe('Page-404 Page', () => {

  test('should ensure all elements are visible on page404', async ({ page }) => {
   const page404 = new Page404(page);
   
   expect(page404.page404Locators.heading).toBeVisible();
   expect(page404.page404Locators.description).toBeVisible();
   expect(page404.page404Locators.link).toBeVisible();
  });

  test('Go To Home link should navigate the user to the dashboard', async ({ page }) => {
    const page404 = new Page404(page);

    await page404.page404Locators.link.click();
    await expect(page).toHaveURL(BASE_URL+'dashboard');
  })
});
