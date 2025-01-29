import test, { expect } from "@playwright/test";
import { RegisterPage } from "../fixtures/pages/register-page";
import { BASE_URL } from "../playwright.config";

test.beforeEach(async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto(page);
})

test.describe('Register Page', () => {

  test('should ensure all elements are visible', async ({ page }) => {
    const registerPage = new RegisterPage(page);

     // Inserted because of loader
    await page.waitForTimeout(3 *1000);

   await expect(registerPage.registerLocators.heading).toBeVisible();
   await expect(registerPage.registerLocators.description).toBeVisible();
   await expect(registerPage.registerLocators.firstNameInput).toBeVisible();
   await expect(registerPage.registerLocators.lastNameInput).toBeVisible();
   await expect(registerPage.registerLocators.contactInput).toBeVisible();
   await expect(registerPage.registerLocators.nationalityInput).toBeVisible();
   await expect(registerPage.registerLocators.idOrPassportInput).toBeVisible();
   await expect(registerPage.registerLocators.addresInput).toBeVisible();
   await expect(registerPage.registerLocators.dateOfBirthInput).toBeVisible();
  });

  test('back button functionality works ', async ({ page }) => {
    // Inserted because of loader
    await page.waitForTimeout(3 *1000);
    await page.click('text=Back');
       // Inserted because of loader
    await page.waitForTimeout(5 *1000);
    await expect(page).toHaveURL(BASE_URL+'welcome');
  })

  test('email input field validation works', async ({ page }) => {
    await page.fill('[name="email"]', 'invalidemail');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Email must be a valid email address')).toBeVisible();
  })
 

});
