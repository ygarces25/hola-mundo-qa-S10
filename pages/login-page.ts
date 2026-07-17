// pages/login-page.ts
import { type Page, type Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly email: Locator;
    readonly password: Locator;
    readonly botonIngresar: Locator;
    readonly mensajeError: Locator;   // ← expuesto para que el TEST lo afirme (NO hay expect acá)
    readonly mensajeExito: Locator;
    readonly mensajeBloqueado: Locator;

    constructor(page: Page) {
        this.page = page;
        // Los locators viven acá, UNA vez. Son los mismos locators semánticos de S4.
        this.email = page.getByLabel('Email');
        this.password = page.getByLabel('Contraseña');
        this.botonIngresar = page.getByRole('button', { name: 'Iniciar sesión' });
        this.mensajeError = page.getByText('Email o contraseña incorrectos');
        this.mensajeExito = page.getByText('Has iniciado sesión correctamente.');
        this.mensajeBloqueado = page.getByText('Demasiados intentos fallidos. Cuenta bloqueada por 30 segundos.');
        // ⚠️ usa el texto REAL que viste en el playground (mayúsculas, tildes, puntos)
    }

    async goto() {
        await this.page.goto('/login');   // navega, nada más
    }

    async login(email: string, password: string) {
        // Las 3 líneas que antes copiabas en CADA test ahora viven acá, en un solo lugar.
        await this.email.fill(email);
        await this.password.fill(password);
        await this.botonIngresar.click();
    }
}