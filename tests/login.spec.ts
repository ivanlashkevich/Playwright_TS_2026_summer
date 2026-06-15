import { test, expect } from '../fixtures/pom.fixture';

// We are using the Playwright fixture to access the page object manager (PomManager)
// This allows us to write cleaner and more maintainable tests by encapsulating page interactions within page objects.
// There is no need for beforeEach for pm. Instead, we directly use the `pm` fixture in each test to access the neccessary page objects.
// The `validUser` fixture provides a valid user object for authentication tests.

test.describe('Login flow', () => {

    test('should login with valid credentials', async ({ pm, valiadUser }) => {
        await pm.loginPage.openLoginPage();
        // Enter valid credentials and submit
        await pm.loginPage.userLogin(valiadUser.username, valiadUser.password);
        // Assert successful login on secure page
        await pm.securePage.assertSuccess();
    });

    test('should show error for invalid credentials', async ({ pm }) => {
        await pm.loginPage.openLoginPage();
        // Enter invalid credentials and submit
        await pm.loginPage.userLogin('badUser', 'badPass');
        // Assert error message is shown
        await pm.loginPage.assertFailedUsername();

        // Using the expect assertion directly from the fixture.
        // This is a quick way to check visibility of an element withoud needing to create a dedicated getter in specific page
        // We added a `locator` method in BasePage to allow quick access to elements.
        await expect(pm.loginPage.locator('#flash')).toBeVisible();
    });
});