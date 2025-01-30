import { Page } from "@playwright/test";
import { BASE_URL } from "../../playwright.config";

export class WelcomePage {

    readonly welcomeLocators = {
        heading: this.page.getByRole('heading', { name: 'Welcome To' }),
        getStartedButton: this.page.getByRole('button', { name: 'Get Started' }),
        signInLink: this.page.getByRole('link', { name: 'Sign In' }),
    }
    constructor(private page: Page) {}

    async goto(page:Page) {
        await page.goto(BASE_URL+'welcome');
    }
}