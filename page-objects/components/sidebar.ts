import {Locator, Page} from '@playwright/test';

export class Sidebar {
    readonly page: Page;
    readonly settingsButton: Locator;
    readonly businessEntitiesLink: Locator;
    readonly gatewaysLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.settingsButton = page.getByRole('link', {name: 'Settings'});
        this.businessEntitiesLink = page.getByRole('link', {name: 'Business entities'});
        this.gatewaysLink = page.getByRole('link', {name: 'Gateways'});
    }

    async goto() {
        await this.page.goto('/');
    }
}
