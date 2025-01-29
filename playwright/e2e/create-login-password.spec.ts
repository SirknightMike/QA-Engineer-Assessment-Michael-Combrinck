import test from "@playwright/test";
import { CreateLoginPasswordPage } from "../fixtures/pages/create-login-password-page";


test.beforeEach(async ({ page }) => {
    const createLoginPage = new CreateLoginPasswordPage(page);
    await createLoginPage.goto(page);
})