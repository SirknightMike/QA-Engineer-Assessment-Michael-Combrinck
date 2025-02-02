import test, { expect } from "@playwright/test";
import { UpdatePasswordPage } from "../fixtures/pages/update-password-page";
import { isValidPassowrd } from "../utils/login";

test.beforeEach(async ({ page }) => {
    const updatePasswordPage = new UpdatePasswordPage(page);
    await updatePasswordPage.goto();
})



test.describe('Update Password Page', () => {
  test('should ensure all elements are visible on the update password page', async ({ page }) => {
   const updatePasswordPage = new UpdatePasswordPage(page);
   
   expect(updatePasswordPage.updatePasswordLocators.heading).toBeVisible();
   expect(updatePasswordPage.updatePasswordLocators.description).toBeVisible();
   expect(updatePasswordPage.updatePasswordLocators.passwordInput).toBeVisible();
   expect(updatePasswordPage.updatePasswordLocators.confirmPasswordInput).toBeVisible();
   expect(updatePasswordPage.updatePasswordLocators.submitButton).toBeVisible();
  })

  test('should ensure that password validation is met', async ({ page }) => {
          
          await page.fill('[name="password"]', 'HeElopassword12@$');
          const password = await page.inputValue('[name="password"]');
          await page.fill('[name="confirmpassword"]', 'HeElopassword12@$');
          const confirmPassword = await page.inputValue('[name="confirmpassword"]');
          await page.getByRole('button', { name: 'Update Password' }).click();
  
          const isPasswordValid = await isValidPassowrd(password);
          const isConfirmPasswordValid = await isValidPassowrd(confirmPassword);
  
          if(password !== confirmPassword ) {
              expect(page.locator('text=Passwords must match')).toBeVisible();
              expect(password).toBe(confirmPassword);
            
          }
  
          expect(password).toBe(confirmPassword);
          expect(password.length).toBeGreaterThan(8);
          expect(isPasswordValid).toBe(true);
        
          expect(isConfirmPasswordValid).toBe(true);
      })

  test('password input field validation works', async ({ page }) => {
    await page.fill('[name="password"]', 'invalidpassword');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Password must contain atleast one lowercase, one uppercase, one number and a special character')).toBeVisible();
    await expect(page.locator('text=Password confirm is required')).toBeVisible();
  })

test('mock POST /api/Account/UpdatePasswordWithToken request', async ({ page }) => {
  const mockUpdatePasswordResponse = {
    success: true,
    message: 'Password updated successfully',
  };

  const mockFailureResponse = {
    success: false,
    message: 'Invalid token or user ID',
  };

  await page.route('**/api/Account/UpdatePasswordWithToken', (route, request) => {

    const requestBody = request.postDataJSON();
    console.log('Received request data:', requestBody);
    if (
      requestBody.password === requestBody.confirmpassword &&
      requestBody.token !== 'Unknown' &&
      requestBody.userId !== 'Unknown'
    ) {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockUpdatePasswordResponse),
      });
    } else {
     
      route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify(mockFailureResponse),
      });
    }
  });

 
  await page.goto('http://localhost:3000/your-password-page'); 

  await page.fill('[name="password"]', 'HeElopassword12@$');
  await page.fill('[name="confirmpassword"]', 'HeElopassword12@$');
  await page.getByRole('button', { name: 'Update Password' }).click();

  await expect(page.locator('text=Password updated successfully')).toBeVisible();
});


});
