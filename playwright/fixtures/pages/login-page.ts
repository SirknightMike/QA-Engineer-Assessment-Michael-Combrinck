import { Page } from "@playwright/test";
import { BASE_URL } from "../../playwright.config";

export class LoginPage {
    constructor( private page: Page) {
    }


    readonly loginLocators = {
        username: '[name="username"]',
        password: '[name="password"]',
        loginButton: 'button[type="submit"]',
    } 

    readonly errorMessageLocators = {
        invalidUsernameOrPassword: this.page.getByText('Invalid username or password'),
    }

   

    async goto(page:Page) {
        await page.goto(BASE_URL+'login');
    }
}