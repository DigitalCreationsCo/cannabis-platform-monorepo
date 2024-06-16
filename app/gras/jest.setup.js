// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`
// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom

import { config as configEnv } from 'dotenv';
import findUp from 'find-up';
const { expand } = require('dotenv-expand');
const _env =
	process.env.NEXT_PUBLIC_IS_LOCAL_BUILD == '1'
		? 'development'
		: process.env.NODE_ENV;
// load env
expand(configEnv({ path: findUp.sync(`.env.${_env}`) })).parsed;
