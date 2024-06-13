import { type PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
	],
	reporter: 'html',
	webServer: {
		// command: 'npm run start',
		// command: 'yarn dev',
		command: 'npx next dev',
		url: 'http://localhost:3000',
		reuseExistingServer: !process.env.CI,
	},
	use: {
		headless: true,
		ignoreHTTPSErrors: true,
		baseURL: 'http://localhost:3000',
		video: 'off',
	},
	testDir: './tests',
};

export default config;
