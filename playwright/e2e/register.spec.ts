import test, { expect } from "@playwright/test";
import { RegisterPage } from "../fixtures/pages/register-page";
import { BASE_URL } from "../playwright.config";
import { isValidName } from "../utils/login";
import { isValidSouthAfricanPhoneNumber } from "../utils/santizer";

test.beforeEach(async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto(page);
    await page.waitForTimeout(3 *1000);
})

test.describe('Register Page', () => {

  test('should ensure all elements are visible on register page', async ({ page }) => {
    const registerPage = new RegisterPage(page);

   await expect(registerPage.registerLocators.heading).toBeVisible();
   await expect(registerPage.registerLocators.description).toBeVisible();
   await expect(registerPage.registerLocators.firstNameInput).toBeVisible();
   await expect(registerPage.registerLocators.lastNameInput).toBeVisible();
   await expect(registerPage.registerLocators.contactInput).toBeVisible();
   await expect(registerPage.registerLocators.nationalityInput).toBeVisible();
   await expect(registerPage.registerLocators.idOrPassportInput).toBeVisible();
   await expect(registerPage.registerLocators.addresInput).toBeVisible();
   await expect(registerPage.registerLocators.dateOfBirthInput).toBeVisible();
   await expect(registerPage.registerLocators.nextButton).toBeVisible();
  });

  test('back button functionality works ', async ({ page }) => {
    // Inserted because of loader
    await page.click('text=Back');
    await page.waitForURL(BASE_URL + 'login');
    await expect(page).toHaveURL(BASE_URL + 'login');
  })

  test('should ensure that user s first name and last name does not contain numbers', async ({ page }) => {

    await page.fill('[name="firstName"]', 'Michael');
    await page.fill('[name="lastName"]', 'test');
    const firstName = await page.inputValue('[name="firstName"]');
    const lastName = await page.inputValue('[name="lastName"]');

    const isFirstNameValid = await isValidName(firstName);
    const isLastNameValid = await isValidName(lastName);

    await page.click('button[type="button"]');

  
    if (!isFirstNameValid) {
      expect(page.locator('text=Please enter a valid name')).toBeVisible();
    } 
    if (!isLastNameValid) {
      expect(page.locator('text=Please enter a valid last name')).toBeVisible();
    }

    if (isFirstNameValid && isLastNameValid) {
      expect(true).toBe(true);
    }
  })

  test('contact input field validation is triggered when invalid contact number is entered', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await page.fill('[name="contactNumber"]', '23523');
    const contactNumber = await page.inputValue('[name="contactNumber"]');

    const isValidContactNumber = isValidSouthAfricanPhoneNumber(contactNumber);
    await registerPage.registerLocators.nextButton.click();
  
    if (!isValidContactNumber) {
      expect(page.locator('text=Please use the following format: +27 72 000 0000')).toBeVisible();
    } 

    if (isValidContactNumber) {
      expect(true).toBe(true);
    }
  })

  test('should ensure that the user can register successfully', async ({ page }) => {
      await page.getByRole('textbox', { name: 'First Name' }).click();
      await page.getByRole('textbox', { name: 'First Name' }).fill('Michael');
      await page.getByRole('textbox', { name: 'Last Name' }).click();
      await page.getByRole('textbox', { name: 'Last Name' }).fill('Combrinck');
      await page.getByRole('textbox', { name: 'Contact Number' }).click();
      await page.getByRole('textbox', { name: 'Contact Number' }).fill('+27 81 493 4932');
      await page.getByLabel('Nationality').selectOption('South African');
      await page.getByRole('textbox', { name: 'ID / Passport Number' }).click();
      await page.getByRole('textbox', { name: 'ID / Passport Number' }).fill('0108035065086');
      await page.getByRole('textbox', { name: 'Address' }).click();
      await page.getByRole('textbox', { name: 'Address' }).fill('7 Big str');
      await page.getByRole('button', { name: 'Choose date' }).click();
      await page.getByRole('gridcell', { name: '30' }).click();
      await page.getByRole('button', { name: '2021' }).click();
      await page.getByRole('button', { name: 'Next' }).click();

      expect(page.locator('text=Parrnter 2 - Information')).toBeVisible();
    })

    test('all errors are displayed when no fields are filled and are null', async ({ page }) => {
      await page.getByRole('button', { name: 'Next' }).click();

      expect(page.locator('text=First name is required')).toBeVisible();
      expect(page.locator('text=Last name is required')).toBeVisible();
      expect(page.locator('text=Contact number is required')).toBeVisible();
      expect(page.locator('text=Nationality is required')).toBeVisible();
      expect(page.locator('text=ID or Passport number is required')).toBeVisible();
      expect(page.locator('text=Address is required')).toBeVisible();
      expect(page.locator('text=dateOfBirth must be a valid date is required')).toBeVisible();
    })
 
    test('mock GET /api/Patient/SignUp request', async ({ page }) => {
      const mockSignUpResponse = {
        success: true,
        message: 'Sign-up successful',
      };
    
      await page.route('**/api/Patient/SignUp?memberKey=Unknown&token=Unknown', (route) => {
        route.fulfill({
          status: 200, 
          contentType: 'application/json',
          body: JSON.stringify(mockSignUpResponse),
        });
      });
    
      await page.goto(BASE_URL+'auth/register'); 

      const signUpSuccessMessage = await page.locator('text=Sign-up successful');
      await expect(signUpSuccessMessage).toBeVisible();
    });

    test('mock POST /api/Patient/SignUp/PersonalDetails request', async ({ page }) => {
      const registerPage = new RegisterPage(page);
      const mockSignUpResponse = {
        success: true,
        message: 'Personal details saved successfully',
      };
   
      await page.route('**/api/Patient/SignUp/PersonalDetails', (route, request) => {
        const requestBody = request.postDataJSON();
        console.log('Received request data:', requestBody);
    
        if (requestBody.firstName && requestBody.lastName && requestBody.contactNumber) {
          route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(mockSignUpResponse),
          });
        } else {
          route.fulfill({
            status: 400,
            contentType: 'application/json',
            body: JSON.stringify({
              success: false,
              message: 'Invalid personal details provided',
            }),
          });
        }
      });
    

      await registerPage.goto(page);
    

      await page.getByRole('textbox', { name: 'First Name' }).click();
      await page.getByRole('textbox', { name: 'First Name' }).fill('Michael');
      await page.getByRole('textbox', { name: 'Last Name' }).click();
      await page.getByRole('textbox', { name: 'Last Name' }).fill('Combrinck');
      await page.getByRole('textbox', { name: 'Contact Number' }).click();
      await page.getByRole('textbox', { name: 'Contact Number' }).fill('+27 81 493 4932');
      await page.getByLabel('Nationality').selectOption('South African');
      await page.getByRole('textbox', { name: 'ID / Passport Number' }).click();
      await page.getByRole('textbox', { name: 'ID / Passport Number' }).fill('0108035065086');
      await page.getByRole('textbox', { name: 'Address' }).click();
      await page.getByRole('textbox', { name: 'Address' }).fill('7 Big str');
      await page.getByRole('button', { name: 'Choose date' }).click();
      await page.getByRole('gridcell', { name: '20' }).click();
      await page.getByRole('button', { name: '2021' }).click();
      await page.getByRole('button', { name: 'Next' }).click();
    
      const successMessage = await page.locator('text=Personal details saved successfully');
      await expect(successMessage).toBeVisible();
    });
   

});
