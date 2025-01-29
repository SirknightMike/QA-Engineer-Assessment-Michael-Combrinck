import { Page } from "@playwright/test";
import { BASE_URL } from "../../playwright.config";

export class ForgotPasswordPage {

    readonly forgotPasswordLocators = {
        heading: this.page.getByRole('heading', { name: 'Forgot Password' }),
        description: this.page.locator('text=Please enter your email address below to reset your password. We will send you an email containing a link, which will allow you to change your password.'),
        emailInput: this.page.locator('[name="email"]'),
        submitButton: this.page.getByRole('button', { name: 'Send' }),
        backButton: this.page.getByRole('button', { name: 'Back' })
    }

    constructor(private page: Page) {}

    async goto(page:Page) {
        await page.goto(BASE_URL+'auth/forgotpassword');
    }
}