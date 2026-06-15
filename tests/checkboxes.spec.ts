import { test, expect } from '../fixtures/pom.fixture';

test.describe('Checkboxes Page', () => {
    // Destructured page here is coming form Playwright's BUILT-IN fixture
    // same page with use without POM
    test('mix POM helpers and raw page actions', async ({ pm, page }) => {
        await pm.checkboxesPage.openCheckboxesPage();
        await pm.checkboxesPage.checkFirstCheckbox();

        // === About `page` below ==================================
        // - `page` comes from Playwright's BUILT-IN fixture;
        // our pom.fixture merely extends the default set, so `page`, `context`, etc. are still available.
        // - It is the exact SAME tab that PomManager is working on.
        // - Save to use for one-off utulities (screenshot, tracing, network intercepts). It does *not* open a new tab or context
        // - Keep business interactions (click, fill, asserts) inside POM.
        await expect(page).toHaveScreenshot('checkboxes-after-check.png');

        await expect(pm.checkboxesPage.locator('form#checkboxes')).toBeVisible();
    });

    test('Uncheck both checkboxes', async ({ pm }) => {
        await pm.checkboxesPage.openCheckboxesPage();
        await pm.checkboxesPage.uncheckFirstCheckbox();
        await pm.checkboxesPage.uncheckSecondCheckbox();
        await pm.checkboxesPage.assertCheckbozesState(false, false);
    });
});
