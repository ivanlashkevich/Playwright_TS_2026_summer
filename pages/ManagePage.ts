// ManagePage acts as a central hub for all page objects in the app.
// It uses lazy getters to create each page object only when needed.
// This saves resources in large test suites, as unused pages are not built.
// For small projects, you could create all page objects up front instead.

import { Page } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { SecurePage } from './SecurePage';
import { CheckboxesPage } from './CheckboxesPage';

export default class ManagePage {
    constructor(private readonly page: Page) {}

    // private caches (undefined until first access)
    private _login?: LoginPage;
    private _secure?: SecurePage;
    private _checkboxes?: CheckboxesPage;

    // Lazy getter: creates the page object only on first use, then reuses it.
    get loginPage(): LoginPage {
        if (!this._login) {
            this._login = new LoginPage(this.page);
        }
        return this._login;
    }

    // same lazy getter code but in one line
    get securePage(): SecurePage {
        return this._secure ??= new SecurePage(this.page);
    }

    get checkboxesPage() {
        return this._checkboxes ??= new CheckboxesPage(this.page);
    }
}
