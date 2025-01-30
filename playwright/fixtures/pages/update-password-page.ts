import { Page } from "@playwright/test";
import { BASE_URL } from "../../playwright.config";

export class UpdatePasswordPage {

    readonly updatePasswordLocators = {
        heading: this.page.getByRole('heading', { name: 'Update Password' }),
        description: this.page.locator('text=Please enter your new password below and then click the update button.'),
        passwordInput: this.page.locator('[name="password"]'),
        confirmPasswordInput: this.page.locator('[name="confirmpassword"]'),
        submitButton: this.page.getByRole('button', { name: 'Update Password' }),
    }

    constructor(private page: Page) {}

    async goto() {
        await this.page.goto(BASE_URL+'auth/updatepassword');
    }
}