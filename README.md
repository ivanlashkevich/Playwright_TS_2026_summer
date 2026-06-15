# Playwright + TypeScript — Page Object Model Example
## Git Hub Actions Report Here:
![Playwright Tests](https://github.com/ivanlashkevich/Playwright_TS_2026_summer/actions/workflows/playwright.yml/badge.svg?branch=main)

> **Need the quick CI setup steps?**  
> See **[CI_GitHub_Actions_Checklist.md](./github_actions_checklist.md)** ✅

---

## 🚀 Quick start

```bash
# 1 Clone & install
git clone https://github.com/ivanlashkevich/Playwright_TS_2026_summer.git
cd Playwright_TS_2026_summer
npm ci

# 2 Run the tests
npx playwright test
```
---

## 🗂️ Project structure

```
├─ pages/
│  ├─ BasePage.ts          # shared helper methods
│  ├─ CheckboxesPage.ts    # reusable-locator example
│  ├─ LoginPage.ts         # inline-locator example
│  ├─ ManagePage.ts        # lazy POM factory
│  └─ SecurePage.ts        
├─ tests/
│  ├─ checkboxes.spec.ts
│  └─ login.spec.ts
├─ playwright.config.ts
├─ package.json
└─ README.md
```

---

## 👀 TypeScript visibility cheatsheet

| Keyword      | Accessible from…                              | Typical use                   |
|--------------|-----------------------------------------------|-------------------------------|
| `public`     | Everywhere (`page.method()` in tests, etc.)   | **Business actions** (`login()`, `addToCart()`) |
| `protected`  | Class itself **and subclasses**               | **Low-level helpers** (`basePageFill`, `basePageClick`) |
| `private`    | Declaring class only                          | Internal state you never expose |

### Example

```ts
abstract class BasePage {
  protected async basePageFill(selector: string | Locator, text: string) {
    await this.toLocator(selector).fill(text);
  }
}

class LoginPage extends BasePage {
  async login(username: string, password: string) {
    await this.basePageFill('#username', username);
    await this.basePageFill('#password', password);
  }
}

// ✅ inside LoginPage         → allowed
// ❌ inside a test file       → mp.loginPage.basePageFill(...)  // compiler error
```

### Why keep helpers `protected`?

1. **Encapsulation** – tests talk in *business language* (`login`, `open`) rather than raw clicks.
2. **Refactor-safety** – change the helper once; no tests break.
3. **Cleaner API** – page objects decide what to expose publicly.

> Need to call a helper from a test?  
> You *can* make it `public`, but you’ll leak low-level details and lose the abstraction that keeps tests readable.

---

### Prerequisites

* **Node.js ≥ 18**
* **Playwright** is already in `devDependencies`; no global install needed.
