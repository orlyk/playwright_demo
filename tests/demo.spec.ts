import {expect, test} from '@playwright/test';
import * as dotenv from 'dotenv';
import {Sidebar} from "../page-objects/components/sidebar";

dotenv.config()
let sidebar;
test.describe('demo suite', () => {

    test('example: simple assertion', async ({page}) => {
        sidebar = new Sidebar(page);
        await page.goto('/');

        await expect(sidebar.businessEntitiesLink,
            'No `Business entities` link for logged in user.')
            .toBeVisible();
    });

    test('example: retries and soft assertions', async ({page}, testInfo) => {
        sidebar = new Sidebar(page);
        await page.goto('/');

        if (testInfo.retry) {
            await cleanSomeCachesOnTheServer()
        }

        await expect.soft(sidebar.businessEntitiesLink,
            'No `Business entities` link for logged in user.')
            .not.toBeVisible();

        await expect(sidebar.gatewaysLink,
            'No `Gateways` link for logged in user.')
            .toBeVisible();
    });

    test('example: pooling assertions', async ({page, baseURL}) => {
        await expect.poll(async () => {
            const response = await page.request.get(baseURL);
            return response.status();
        }, {
            message: 'make sure API eventually succeeds',
            intervals: [1_000, 2_000, 10_000],
            timeout: 60_000
        }).toBe(200);
    });

    test('example: retrying assertions', async ({page, baseURL}) => {
        await expect(async () => {
            const response = await page.request.get(baseURL);
            expect(response.status()).toBe(200);
        }).toPass({
            // Probe, wait 1s, probe, wait 2s, probe, wait 10s, probe, wait 10s, probe, .... Defaults to [100, 250, 500, 1000].
            intervals: [1_000, 2_000, 10_000],
            timeout: 60_000
        });
    });
})

function cleanSomeCachesOnTheServer() {
    console.log('cleanSomeCachesOnTheServer');
}
