## Demo Playwright project for QA CoP

**Note:** In order to start the project Node version should be >= 18

1. Run `npm i`
2. Create `.env` file with content:
```text
BASE_URL=https://ddm-grid-manager.develop.beyonnex.org
USER_NAME=ddm.integration.tests
PASSWORD=<ask in #ddm channel or @Alexander Orlyk in Slack>
```
3. Run `npx playwright test`

**Additional commands:**
- run only e2e test: ` npx playwright test --project=e2e-webkit`
- run in UI mode: `npx playwright test --ui`
