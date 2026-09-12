import { test, expect } from './fixtures';

const casos = [
    //{
    // nombre: 'email vacío',
    // email: '',
    //password: 'Segura2026!',
    //esperado: 'error'
    //},

    //{
    //nombre: 'contraseña vacía',
    //email: 'ana.garcia@ejemplo.com',
    //esperado: 'error'
    //},

    {
        nombre: 'email sin arroba',
        email: 'ana.garcia',
        password: 'Segura2026!',
        esperado: 'error'
    },

    {
        nombre: 'contraseña incorrecta',
        email: 'ana.garcia@ejemplo.com',
        password: 'ContraseñaMala123',
        esperado: 'error'
    },

    {
        nombre: 'credenciales válidas',
        email: 'ana.garcia@ejemplo.com',
        password: 'Segura2026!',
        esperado: 'exito'
    },
];

for (const caso of casos) {
    test(`login con ${caso.nombre} → ${caso.esperado}`, async ({ loginPage, page }) => {
        await loginPage.login(caso.email, caso.password);

        if (caso.esperado === 'exito') {
            await expect(loginPage.mensajeExito).toBeVisible();
        } else {
            // triangulación de S11, con el locator que expone el page object
            await expect(loginPage.mensajeError).toBeVisible();
            // await expect(loginPage.mensajeErrorEmail).toBeVisible();
            // await expect(loginPage.mensajeErrorPassword).toBeVisible();       // 1) error SÍ
            await expect(loginPage.mensajeExito).not.toBeVisible();   // 2) éxito NO
            await expect(page).toHaveURL(/.*login/);                  // 3) sigo en login
        }
    });
}