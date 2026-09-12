import { test, expect } from './fixtures';

// ── Dataset: valores límite del formulario de login ──────────────────────────
// Credenciales válidas: ana.garcia@ejemplo.com / Segura2026! (11 caracteres)
// El sistema valida mínimo 11 caracteres de contraseña; sin límite superior.
// El error mostrado es genérico para todos los casos negativos.

type Caso = {
    nombre: string;
    email: string;
    password: string;
    esperado: 'exito' | 'error';
};

const casos: Caso[] = [
    // ── Caso feliz ────────────────────────────────────────────────────────────
    { nombre: 'credenciales válidas exactas', email: 'ana.garcia@ejemplo.com', password: 'Segura2026!', esperado: 'exito' },

    // ── Email: bordes de formato ──────────────────────────────────────────────
    { nombre: 'email sin @', email: 'ana.garcia.ejemplo.com', password: 'Segura2026!', esperado: 'error' },
    { nombre: 'email sin dominio', email: 'ana.garcia@', password: 'Segura2026!', esperado: 'error' },
    { nombre: 'email sin usuario', email: '@ejemplo.com', password: 'Segura2026!', esperado: 'error' },
    { nombre: 'email sin extensión de dominio', email: 'ana.garcia@ejemplo', password: 'Segura2026!', esperado: 'error' },
    { nombre: 'email con espacios', email: 'ana .garcia@ejemplo.com', password: 'Segura2026!', esperado: 'error' },
    { nombre: 'email vacío', email: '', password: 'Segura2026!', esperado: 'error' },

    // ── Password: bordes de longitud ──────────────────────────────────────────
    { nombre: 'contraseña vacía', email: 'ana.garcia@ejemplo.com', password: '', esperado: 'error' },
    { nombre: 'contraseña con 10 caracteres (borde -1)', email: 'ana.garcia@ejemplo.com', password: 'Segura202!', esperado: 'error' },
    { nombre: 'contraseña con 11 caracteres (borde exacto válido)', email: 'ana.garcia@ejemplo.com', password: 'Segura2026!', esperado: 'exito' },
    { nombre: 'contraseña con 12 caracteres (borde +1)', email: 'ana.garcia@ejemplo.com', password: 'Segura2026!!', esperado: 'exito' },
    { nombre: 'contraseña incorrecta', email: 'ana.garcia@ejemplo.com', password: 'ContraseñaMala123', esperado: 'error' },

    // ── Usuario inexistente ───────────────────────────────────────────────────
    { nombre: 'usuario no registrado', email: 'noexiste@ejemplo.com', password: 'Segura2026!', esperado: 'error' },

    // ── Ambos campos vacíos ───────────────────────────────────────────────────
    { nombre: 'email y contraseña vacíos', email: '', password: '', esperado: 'error' },

    // ── Inyección / caracteres especiales ─────────────────────────────────────
    { nombre: 'SQL injection en email', email: "' OR '1'='1", password: 'Segura2026!', esperado: 'error' },
    { nombre: 'script en contraseña', email: 'ana.garcia@ejemplo.com', password: '<script>alert(1)</script>', esperado: 'error' },
];

// ── Test parametrizado ────────────────────────────────────────────────────────
test.describe('Login — valores límite', () => {

    for (const { nombre, email, password, esperado } of casos) {

        test(nombre, async ({ loginPage, page }) => {
            // Actuar
            await loginPage.login(email, password);

            if (esperado === 'exito') {
                // Verificar camino feliz
                await expect(loginPage.mensajeExito).toBeVisible();
                await expect(loginPage.mensajeError).not.toBeVisible();
            } else {
                // Verificar camino de error
                await expect(loginPage.mensajeError).toBeVisible();
                await expect(loginPage.mensajeExito).not.toBeVisible();
                await expect(page).toHaveURL(/.*login/);
            }
        });
    }
});
