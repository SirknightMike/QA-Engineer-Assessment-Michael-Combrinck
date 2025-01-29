import { Page } from "@playwright/test";
import { BASE_URL } from "../../playwright.config";

export class RegisterPage {
    constructor(private page: Page) {}
    
    readonly registerLocators = {
        heading: this.page.getByRole('heading', { name: 'Partner 1 - Information' } ),
        description: this.page.locator('text=Please enter all of your personal information below. These will be the details of the primary patient'),
        firstNameInput: this.page.locator('[name="firstName"]'),
        lastNameInput: this.page.locator('[name="lastName"]'),
        contactInput: this.page.locator('[name="contactNumber"]'),
        nationalityInput: this.page.locator('select[name="nationality"]'),
        idOrPassportInput: this.page.locator('[name="idOrPassport"]'),
        addresInput: this.page.locator('[name="address"]'),
        dateOfBirthInput: this.page.locator('div').filter({ hasText: /^Date of Birth$/ })
    }

    async goto(page:Page) {
        await page.goto(BASE_URL+'auth/register');
    }
}