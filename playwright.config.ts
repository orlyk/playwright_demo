import {defineConfig, devices} from '@playwright/test';
import * as path from "path";

require('dotenv').config();
export const STORAGE_STATE = path.join(__dirname, '.auth/user.json');

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    testDir: './tests',
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: 2,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: 'html',
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: process.env.BASE_URL,

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry',
        headless: false,
        video: "on"
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'login-setup',
            testMatch: 'login.setup.ts',
            testDir: './utils'
        },
        {
            name: 'e2e-webkit',
            use: {
                ...devices['Desktop Safari'],
                storageState: STORAGE_STATE,
            },
            dependencies: ['login-setup'],
        },
    ],
});
