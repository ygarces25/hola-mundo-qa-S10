// pages/registro-page.ts
import { type Page, type Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly name: Locator;
    readonly email: Locator;
    readonly password: Locator;
    readonly botonRegistrar: Locator;
    readonly mensajeErrorEmailinvalido: Locator;   // ← expuesto para que el TEST lo afirme (NO hay expect acá)
    readonly mensajeErrorPasswordinvalido: Locator;
    readonly mensajeExito: Locator;
    readonly mensajeErrorNombrevacio: Locator;   // ← expuesto para que el TEST lo afirme (NO hay expect acá)
    readonly mensajeErrorEmailvacio: Locator;
    readonly mensajeErrorPasswordvacio: Locator;

    constructor(page: Page) {
        this.page = page;
        // Los locators viven acá, UNA vez. Son los mismos locators semánticos de S4.
        this.name = page.getByLabel('Nombre completo');
        this.email = page.getByLabel('Email');
        this.password = page.getByLabel('Contraseña');
        this.botonRegistrar = page.getByRole('button', { name: 'Crear cuenta' });
        this.mensajeErrorEmailinvalido = page.getByText('El email no tiene un formato válido');
        this.mensajeErrorPasswordinvalido = page.getByText('La contraseña debe tener al menos 8 caracteres');
        this.mensajeExito = page.getByText('Hola, Maria. Aquí encuentras los cursos de tu cuenta.');
        //this.mensajeBloqueado = page.getByText('Demasiados intentos fallidos. Cuenta bloqueada por 30 segundos.');
        this.mensajeErrorNombrevacio = page.getByText('El nombre es obligatorio');
        this.mensajeErrorEmailvacio = page.getByText('El email es obligatorio');
        this.mensajeErrorPasswordvacio = page.getByText('La contraseña es obligatoria');

        // ⚠️ usa el texto REAL que viste en el playground (mayúsculas, tildes, puntos)
    }

    async goto() {
        await this.page.goto('/registro');   // navega, nada más
    }

    async registro(nombre: string, email: string, password: string) {
        // Las 4 líneas que antes copiabas en CADA test ahora viven acá, en un solo lugar.
        await this.name.fill(nombre);
        await this.email.fill(email);
        await this.password.fill(password);
        await this.botonRegistrar.click();
    }
}

// MI ANOTACIÓN PARA S14:

// Escribir este page object a mano me llevó ___ minutos.
// Me llevo 30 minutos

// Cómo se sintió el trabajo (marca lo que aplique): mecánico / repetitivo /
// tedioso / "otra vez lo mismo que con LoginPage" / entretenido /
// Tedioso porque había que buscar manualmente los localizadores y definirlos en el Registro-page ya que era una página distinta a la del Login.

// PREGUNTA: ¿no podría la IA leer el HTML de la página y armar este page
// object sola, para ahorrarme este laburo mecánico?
// Si lo puede armar.

// Y si lo armara: ¿cómo sabría YO si está bien hecho? ¿En qué me fijaría?
//Revisaría si eligió los localizadores correctos como se le indico en el prompt.