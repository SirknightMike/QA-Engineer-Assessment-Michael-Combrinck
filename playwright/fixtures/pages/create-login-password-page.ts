import { Page } from "@playwright/test";
import { BASE_URL } from "../../playwright.config";

export class CreateLoginPasswordPage {

    readonly createLoginPasswordLocators = {
        heading: this.page.getByRole('heading', { name: 'Create Login Password' }),
        description: this.page.locator('text=Please enter your desired login password below and then click the create button.'),
        passwordInput: this.page.locator('[name="password"]'),        
        confirmPasswordInput: this.page.locator('[name="confirmpassword"]'),
        submitButton: this.page.getByRole('button', { name: 'Create Password' }),
    }

    constructor(private page: Page) {}
    async goto() {
        await this.page.goto(BASE_URL+'auth/createpassword');
    }
}