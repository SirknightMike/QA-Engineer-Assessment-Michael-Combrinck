import { Page } from "@playwright/test";
import { LoginPage } from "../fixtures/pages/login-page";


export async function login(page: Page, username: string, password: string) {
    const loginPage = new LoginPage(page);
    await loginPage.goto(page);
    await page.fill('[name="username"]', username);
    await page.fill('[name="password"]', password);
    await page.click('button[type="submit"]');
}