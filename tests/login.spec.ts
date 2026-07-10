// Importamos las dos piezas de Playwright que usamos:
// - test: para definir un test
// - expect: para hacer las verificaciones
import { test, expect } from '@playwright/test';

// test('nombre del test', async ({ page }) => { ... })
// El 'async' y el 'page' vienen del motor de Playwright.
// 'page' es la pestaña del navegador que el test maneja.
test('login exitoso con credenciales válidas', async ({ page }) => {

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
    await page.getByLabel('Contraseña').fill('Segura2026!');

    // getByRole('button', { name: '...' }) = el "rey" de S4.
    // .click() aprieta el botón.
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();

    // ───── VERIFICAR (Assert) ─────
    // UNA SOLA verificación, la más liviana: que se vea el mensaje de éxito.
    // Si está → el test pasa (verde). Si no → falla (rojo).
    // Hoy NO entramos en la mecánica de las aserciones (cómo espera, qué otras hay):
    // las aserciones web-first + auto-waiting son el corazón de S11.
    await expect(page.getByText('Has iniciado sesión correctamente.')).toBeVisible();
});

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
    await expect(page.getByText('Email o contraseña incorrectos')).toBeVisible();
});

test('login con usuario inexistente', async ({ page }) => {
    // PREPARAR
    await page.goto('/login');

    // ACTUAR
    await page.getByLabel('Email').fill('noexiste@ejemplo.com');
    await page.getByLabel('Contraseña').fill('CualquierCosa123');
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();

    // VERIFICAR: ... ⬅️ acá aplicas lo de S11
    // 1) el error SÍ apareció
    await expect(page.getByText('Email o contraseña incorrectos')).toBeVisible();
    // 2) el éxito NO apareció
    await expect(page.getByText('Has iniciado sesión correctamente.')).not.toBeVisible();
    // 3) sigo en la página de login
    await expect(page).toHaveURL(/.*login/);
});

test('login con usuario vacio', async ({ page }) => {
    // PREPARAR
    await page.goto('/login');

    // ACTUAR
    // No se llena el campo "Email" a proposito
    await page.getByLabel('Contraseña').fill('CualquierCosa123');
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();

    // VERIFICAR: ... ⬅️ acá aplicas lo de S11
    await expect(page.getByText('El email es obligatorio')).toBeVisible();
});

// MI CUENTA PARA S12:
// Escribí page.goto('/login') 3 veces.
// Llené el email 3 veces.
// Clickeé el botón 'Iniciar sesión' 3 veces.
//
// PREGUNTA: si mañana el botón 'Iniciar sesión' cambia de nombre
// (por ejemplo, pasa a llamarse 'Entrar'), ¿en cuántos lugares
// tendría que tocar mi código para que los 3 tests sigan andando?
// Mi respuesta: Se tendría que tocar Een las 3 líneas de código que dicen: await page.getByRole('button', { name: 'Iniciar sesión' }).click();

// NOTA de Adriana: Si eliges "email vacío": puede que el navegador NO te deje ni enviar el formulario, porque el campo tiene validación de HTML (`required`) y frena todo antes de llegar al servidor.
//Eso es un comportamiento DISTINTO al de la contraseña mala (que sí llega al servidor y devuelve un mensaje). Si te pasa eso, "no es un error tuyo: es una observación válida." Anótala y tráela
//(¿qué pasó distinto vs. la contraseña mala de S11?).
//Mi respuesta = Se observa que para el caso de “Email vacío” el endpoint del Login no envía ninguna respuesta al servidor y para el caso de “Contraseña incorrecta” el servicio si envía una respuesta.