import { Page } from "@playwright/test";
import { LoginPage } from "../fixtures/pages/login-page";


export async function login(page: Page, username: string, password: string) {
    const loginPage = new LoginPage(page);
    await loginPage.goto(page);
    await page.fill('[name="username"]', username);
    await page.fill('[name="password"]', password);
    await page.click('button[type="submit"]');
}

export async function isValidPassowrd(password:string) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\S+$/;
    return regex.test(password)
}

export async function isValidName(name:string) {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(name)
}