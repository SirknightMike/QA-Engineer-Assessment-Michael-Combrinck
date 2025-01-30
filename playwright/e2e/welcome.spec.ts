import test, { expect } from "@playwright/test";
import { RegisterPage } from "../fixtures/pages/register-page";
import { BASE_URL } from "../playwright.config";
import { WelcomePage } from "../fixtures/pages/welcome-page";

test.beforeEach(async ({ page }) => {
    const welcomePage = new WelcomePage(page);
    await welcomePage.goto(page);
})

test.describe('Welcome Page', () => {

  test('should ensure all elements are visible', async ({ page }) => {
   const welcomePage = new WelcomePage(page);
   
   expect(welcomePage.welcomeLocators.heading).toBeVisible();
   expect(welcomePage.welcomeLocators.getStartedButton).toBeVisible();
   expect(welcomePage.welcomeLocators.signInLink).toBeVisible();
  });

  test('navigation to welcome page should work', async ({ page }) => {
    expect(page).toHaveURL(BASE_URL+'welcome');

  })

  test('ensure that Get Started button navigates to register page', async ({ page }) => {
    const welcomPage = new WelcomePage(page);

    await welcomPage.welcomeLocators.getStartedButton.click();
    await expect(page).toHaveURL(BASE_URL+'auth/register');
  })

  test('Sign In link should navigate to login page', async ({ page }) => {
    const welcomePage = new WelcomePage(page);

    await welcomePage.welcomeLocators.signInLink.click();
    await expect(page).toHaveURL(BASE_URL+'login');
  })
});
