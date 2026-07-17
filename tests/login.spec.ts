import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';

test('login exitoso con credenciales válidas', async ({ page }) => {
    const loginPage = new LoginPage(page); //Se instancia el Page Object
    //Preparar
    await loginPage.goto();
    //Actuar
    await loginPage.login('ana.garcia@ejemplo.com', 'Segura2026!');
    //Verificar
    await expect(loginPage.mensajeExito).toBeVisible();
});

test('login fallido con contraseña incorrecta', async ({ page }) => {
    const loginPage = new LoginPage(page); //Se instancia el Page Object
    //Preparar
    await loginPage.goto();
    //Actuar
    await loginPage.login('ana.garcia@ejemplo.com', 'ContraseñaMala123');
    //Verificar
    await expect(loginPage.mensajeError).toBeVisible();
});

test('login con usuario inexistente', async ({ page }) => {
    const loginPage = new LoginPage(page); //Se instancia el Page Object
    //Preparar
    await loginPage.goto();
    //Actuar
    await loginPage.login('noexiste@ejemplo.com', 'CualquierCosa123');
    //Verificar
    await expect(loginPage.mensajeError).toBeVisible();
});

test('login con email de formato inválido', async ({ page }) => {
    const loginPage = new LoginPage(page); //Se instancia el Page Object
    //Preparar
    await loginPage.goto();
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

//*test('login con Usuario Bloqueado', async ({ page }) => {
//* const loginPage = new LoginPage(page); //Se instancia el Page Object
//Preparar
//*await loginPage.goto();
//Actuar
//*await loginPage.login('ana.garcia@ejemplo.com', 'ContraseñaMala123');
//*await loginPage.login('noexiste@ejemplo.com', 'CualquierCosa123');
//*await loginPage.login('ana.garcia', 'Segura2026!');
//*await loginPage.login('ana.garcia', 'Segura2026!');
// VERIFICAR: ... ⬅️ acá triangulas si es negativo
// 1) el bloqueado SÍ apareció
//*await expect(loginPage.mensajeBloqueado).toBeVisible();
// 2) el error No apareció
//*await expect(loginPage.mensajeError).not.toBeVisible();
// 2) el éxito NO apareció
//*await expect(loginPage.mensajeExito).not.toBeVisible();
// 3) sigo en la página de login
//*await expect(page).toHaveURL(/.*login/);
//*});

// MI CUENTA PARA S13:
// Escribí "const loginPage = new LoginPage(page)" 4 veces.
// Escribí "await loginPage.goto()" 4 veces.
//
// OBSERVACIÓN: esta preparación se repite en TODOS mis tests, idéntica,
// antes de que empiece lo interesante de cada caso.
//
// PREGUNTA: ¿no habría forma de que esta preparación pase SOLA,
// automáticamente, antes de cada test, sin que yo la escriba cada vez?
// Lo que se me ocurre:
// Se me ocurre crear otra clase llamada “LooginPageGoto” que llame a través de un “Import” la clase “LoginPage” y colocar en esa nueva clase el "const loginPage = new LoginPage(page)" y el "await loginPage.goto()" y que la misma sea llamada a través de un “Import” en el login.spec.ts