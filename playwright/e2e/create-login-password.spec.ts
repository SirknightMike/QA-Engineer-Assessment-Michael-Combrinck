import test, { expect } from "@playwright/test";
import { CreateLoginPasswordPage } from "../fixtures/pages/create-login-password-page";
import { isValidPassowrd } from "../utils/login";

test.beforeEach(async ({ page }) => {
    const createLoginPage = new CreateLoginPasswordPage(page);
    await createLoginPage.goto();
})

test.describe('Create Login Password Page', () => { 
    test('should ensure all elements are visible', async ({ page }) => {
        const createLoginPage = new CreateLoginPasswordPage(page);
    
        expect(createLoginPage.createLoginPasswordLocators.heading).toBeVisible();
        expect(createLoginPage.createLoginPasswordLocators.description).toBeVisible();
        expect(createLoginPage.createLoginPasswordLocators.passwordInput).toBeVisible();
        expect(createLoginPage.createLoginPasswordLocators.confirmPasswordInput).toBeVisible();
        expect(createLoginPage.createLoginPasswordLocators.submitButton).toBeVisible();
    })

    test('should ensure that password input field is equal to confirm password input field and passwords are valid', async ({ page }) => {
        
        await page.fill('[name="password"]', 'HeElopassword12@$');
        const password = await page.inputValue('[name="password"]');
        await page.fill('[name="confirmpassword"]', 'HeElopassword12@$');
        const confirmPassword = await page.inputValue('[name="confirmpassword"]');
        await page.getByRole('button', { name: 'Create Password' }).click();

        const isPasswordValid = await isValidPassowrd(password);
        console.log('testing the value of the validation', isPasswordValid)
        const isConfirmPasswordValid = await isValidPassowrd(confirmPassword);

        if(password !== confirmPassword ) {
            expect(page.locator('text=Passwords must match')).toBeVisible();
            expect(password).toBe(confirmPassword);
          
        }

        expect(password).toBe(confirmPassword);
        expect(isPasswordValid).toBe(true);
        expect(isConfirmPasswordValid).toBe(true);
        
    })
})

