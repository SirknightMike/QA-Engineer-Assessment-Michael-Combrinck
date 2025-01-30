import { Page } from "@playwright/test";
import { BASE_URL } from "../../playwright.config";

export class Page404 {
    constructor(private page: Page) {}
    readonly page404Locators = {
        heading: this.page.locator('text=Sorry, page not found!'),
        description: this.page.locator('text=Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to check your spelling.'),
        link: this.page.getByRole('link', { name: 'Go To Home' }),
    }

    async goto() {
        await this.page.goto(BASE_URL as string);
    }
}