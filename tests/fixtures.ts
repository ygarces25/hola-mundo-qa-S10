// tests/fixtures.ts  ← archivo nuevo
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login-page';

type MisFixtures = { loginPage: LoginPage };

export const test = base.extend<MisFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();     // preparación (esto es el "Arrange")
        await use(loginPage);       // se lo entrega al test, YA listo
    },
});

export { expect } from '@playwright/test';