import { test, expect } from './fixtures';   // ← ojo: importas desde TU fixture, no de @playwright/test

test('login exitoso con credenciales válidas', async ({ loginPage }) => {
    await loginPage.login('ana.garcia@ejemplo.com', 'Segura2026!');
    await expect(loginPage.mensajeExito).toBeVisible();
});

test('login fallido con contraseña incorrecta', async ({ loginPage, page }) => {
    await loginPage.login('ana.garcia@ejemplo.com', 'ContraseñaMala123');

    await expect(loginPage.mensajeError).toBeVisible();
    await expect(loginPage.mensajeExito).not.toBeVisible();
    await expect(page).toHaveURL(/.*login/);
});

test('login con usuario inexistente', async ({ loginPage }) => {
    //Actuar
    await loginPage.login('noexiste@ejemplo.com', 'CualquierCosa123');
    //Verificar
    await expect(loginPage.mensajeError).toBeVisible();
});

test('login con email de formato inválido', async ({ loginPage, page }) => {
    //Actuar
    await loginPage.login('ana.garcia', 'Segura2026!');
    // VERIFICAR: ... ⬅️ acá triangulas si es negativo
    // 1) el error SÍ apareció
    await expect(loginPage.mensajeError).toBeVisible();
    // 2) el éxito NO apareció
    await expect(loginPage.mensajeExito).not.toBeVisible();
    // 3) sigo en la página de login
    await expect(page).toHaveURL(/.*login/);
});