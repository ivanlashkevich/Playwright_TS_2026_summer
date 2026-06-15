// We are creating a Playwright fixture that initializes a page object manager (PovManager) for each test.
// This allows us to access various page objects (like LoginPage, SecurePage, etc.) through the manager.
// The fiexture also providesa a valid user object for authentication tests.

import { test as base } from '@playwright/test';
import PomManager from '../pages/ManagePage';
import { validUser } from '../test-data/validUser';

type MyFixtures = {
    pm: PomManager;
    validUser: { username: string; password: string };
}

export const test = base.extend<MyFixtures>({
    // re-use playwright's page object
    // create the PomManager with the page object and hand it to the test
    pm: async ({ page }, use) => {
        await use(new PomManager(page));
    },
    // plain value fixture (available in all tests)
    validUser,
});

export { expect } from '@playwright/test';
