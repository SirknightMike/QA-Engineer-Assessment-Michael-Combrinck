import { defineConfig } from '@playwright/test';

import dotenv from 'dotenv';
import path from 'path';
dotenv.config( { path: path.resolve(__dirname, '.env') } );

export const BASE_URL = process.env.BASE_URL;

export default defineConfig({
  testDir: './e2e',
  timeout: 30000,
  retries: 2,
  expect: {
    timeout: 5000,
  },
  reporter: [['list'], ['html', { open: 'never' }]],
  webServer: {
    command: 'npm run start',
    url: 'http://127.0.0.1:3000',
  },
  use: {
    headless: true,
    baseURL: 'http://localhost:3000',
    viewport: { width: 1280, height: 720 },
    actionTimeout: 5000,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
});
