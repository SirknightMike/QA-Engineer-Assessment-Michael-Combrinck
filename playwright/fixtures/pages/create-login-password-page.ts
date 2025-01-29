import { Page } from "@playwright/test";
import { BASE_URL } from "../../playwright.config";

export class CreateLoginPasswordPage {
    constructor(private page: Page) {}
    async goto() {
        await this.page.goto(BASE_URL+'auth/createpassword');
    }
}