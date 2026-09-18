// pages/registro-page.ts
import { type Page, type Locator } from '@playwright/test';

/**
 * Page Object del formulario de registro.
 * URL de referencia: https://playground.calidadsinhumo.com/registro
 *
 * Locators basados en evidencia HTML real de la página.
 * Ningún expect vive aquí; las aserciones pertenecen al test.
 */
export class RegistroPage {
    readonly page: Page;

    // --- Controles del formulario ---
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly ageInput: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // Locators semánticos: getByLabel para inputs, getByRole para el botón.
        // Textos exactos de las etiquetas <label> del HTML real de la página.
        this.nameInput = page.getByLabel('Nombre completo');
        this.emailInput = page.getByLabel('Email');
        this.passwordInput = page.getByLabel('Contraseña');
        this.ageInput = page.getByLabel('Edad');
        this.submitButton = page.getByRole('button', { name: 'Crear cuenta' });
    }

    /** Navega a la página de registro. */
    async goto(): Promise<void> {
        await this.page.goto('https://playground.calidadsinhumo.com/registro');
    }

    /**
     * Rellena el formulario completo y hace clic en Crear cuenta.
     * @param nombre   - Nombre completo del usuario
     * @param email    - Email del usuario
     * @param password - Contraseña (mínimo 8 caracteres)
     * @param edad     - Edad del usuario
     */
    async registrar(
        nombre: string,
        email: string,
        password: string,
        edad: string,
    ): Promise<void> {
        await this.nameInput.fill(nombre);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.ageInput.fill(edad);
        await this.submitButton.click();
    }
}