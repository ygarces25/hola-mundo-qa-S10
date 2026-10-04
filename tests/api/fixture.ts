import { test, expect } from '@playwright/test';

test('POST /api/login rechaza credenciales incorrectas', async ({ request }) => {
    // request es un APIRequestContext preparado por Playwright
});