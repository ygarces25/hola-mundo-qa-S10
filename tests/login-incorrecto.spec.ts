// Importamos las dos piezas de Playwright que usamos:
// - test: para definir un test
// - expect: para hacer las verificaciones
import { test, expect } from '@playwright/test';

// test('nombre del test', async ({ page }) => { ... })
// El 'async' y el 'page' vienen del motor de Playwright.
// 'page' es la pestaña del navegador que el test maneja.
test('login fallido con contraseña incorrecta', async ({ page }) => {

    // ───── PREPARAR (Arrange) ─────
    // Abrir la página de login.
    // Escribimos solo '/login' porque el baseURL ya está en el config.
    // Lleva 'await' porque es asíncrono (S5): el test ESPERA a que cargue.
    await page.goto('/login');

    // ───── ACTUAR (Act) ─────
    // Usamos los locators semánticos que elegimos en S4.
    // getByLabel('Email') agarra el input por su etiqueta. .fill() escribe.
    await page.getByLabel('Email').fill('ana.garcia@ejemplo.com');

    // Mismo patrón para la contraseña (label "Contraseña").
    await page.getByLabel('Contraseña').fill('ContraseñaMala123');

    // getByRole('button', { name: '...' }) = el "rey" de S4.
    // .click() aprieta el botón.
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();

    // ───── VERIFICAR (Assert) ─────
    // UNA SOLA verificación, la más liviana: que se vea el mensaje de éxito.
    // Si está → el test pasa (verde). Si no → falla (rojo).
    // Hoy NO entramos en la mecánica de las aserciones (cómo espera, qué otras hay):
    // las aserciones web-first + auto-waiting son el corazón de S11.
    await expect(page.getByText('Email o contraseña incorrectos.', { exact: false })).toBeVisible();

    // MI DUDA PARA S11:
    // Hice todo lo indicado en la tarea y la corrección sugerida por el agente de manera maual agregando la propiedad {exact:false} y {exact:true}, 
    // pero igual no funnciono. ¿Deseo saber cual puede ser el error o que debo agregar exactamente en la sintaxis del codigo?
})