import { defineConfig, devices } from "@playwright/test";

/**
 * E2E tests.
 * - Locally / in CI: builds and starts the app, then tests http://localhost:3000.
 * - Against a deployed preview: set BASE_URL and the local server is skipped.
 */
const baseURL = process.env.BASE_URL ?? "http://localhost:3000";
const useLocalServer = !process.env.BASE_URL;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: useLocalServer
    ? {
        command: "npm run build && npm run start",
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
      }
    : undefined,
});
