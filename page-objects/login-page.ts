import {Locator, Page} from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly signInButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByPlaceholder('login.username');
        this.passwordInput = page.getByPlaceholder('login.password');
        this.signInButton = page.getByRole('button', {name: 'login.login'});
    }

    async goto() {
        await this.page.goto('/login?redirect=');
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.signInButton.click();
    }
}
