import {expect, test as setup} from '@playwright/test';
import * as dotenv from 'dotenv';
import {LoginPage} from "../page-objects/login-page";
import {Sidebar} from "../page-objects/components/sidebar";
import {STORAGE_STATE} from "../playwright.config";

dotenv.config()

setup('do login', async ({page}) => {
    const loginPage = new LoginPage(page);
    const sidebar = new Sidebar(page);

    await loginPage.goto();

    await loginPage.login(process.env.USER_NAME, process.env.PASSWORD);

    await page.waitForURL(/.*business-entities/);
    await expect(sidebar.settingsButton,
        'No `Settings` button for logged in user')
        .toBeVisible();
    await page.context().storageState({
        path: STORAGE_STATE,
    });
});
