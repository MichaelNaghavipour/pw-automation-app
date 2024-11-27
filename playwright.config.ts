import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';
import * as dotenv from 'dotenv';

dotenv.config();

// Validate required variables
if (!process.env.EMAIL || !process.env.PASSWORD) {
  throw new Error('Missing required environment variables: EMAIL or PASSWORD')
}

export default defineConfig<TestOptions>({

  timeout: 40 * 1000,
  globalTimeout: 10 * 60 * 1000,

  testDir: 'tests',

  // Run all tests in parallel.
  fullyParallel: true,

  // Retry on CI only.
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI.
  workers: process.env.CI ? 1 : undefined,
    
  // Reporter to use
  reporter: 'html',

  use: {
    globalsQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/',
    baseURL: 'http://localhost:4200/',

    trace: 'on-first-retry',
    screenshot: "only-on-failure",
    video: {
      mode: 'on',
    }
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { 
        browserName: 'firefox'
      },
    },
    {
      name: 'mobile',
      testMatch: 'testMobile.spec.ts',
      use: {
        ...devices['iPhone 14 Pro']
      }
    }
  ],
  // Run your local dev server before starting the tests.
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:4200/',
    reuseExistingServer: true,
  },
});
