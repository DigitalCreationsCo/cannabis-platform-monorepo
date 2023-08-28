/* eslint-disable */

import { urlBuilder } from '@cd/core-lib';
import axios from 'axios';
import { createMocks } from 'node-mocks-http';
import userHandlerPost from '../../../src/pages/api/user/index';
import userHandlerGet from '../../../src/pages/api/user/[id]/index';

beforeAll(() => {
	jest.mock('axios');
	jest.mock(userHandlerGet);
	jest.mock(userHandlerPost);
});

describe('GET User', () => {
	it('getUsersByOrgId return the correct server call', async () => {
		const { req, res } = createMocks({
			method: 'GET',
			query: {
				animal: 'dog',
			},
		});
		await userHandlerGet(req, res);
		expect(axios).toHaveBeenLastCalledWith(urlBuilder.main.ordersByOrgId('3'));
	});
});

describe('/api/user/1', () => {
	it('GET User - axios sends the correct server call', async () => {
		const { req, res } = createMocks({
			method: 'GET',
			query: {
				animal: 'dog',
			},
		});
		await userHandlerGet(req, res);
		expect('1').toStrictEqual('1');
	});
});

describe('POST User', () => {
	it('POST User - axios sends the correct server call', async () => {
		const { req, res } = createMocks({
			method: 'GET',
			query: {
				animal: 'dog',
			},
		});
		await userHandlerPost(req, res);
		expect(axios.config.url).toStrictEqual(
			'http://localhost:6001/api/v1/user/',
		);
	});
});

describe('PUT User', () => {
	it('PUT User - axios sends the correct server call', async () => {
		const { req, res } = createMocks({
			method: 'GET',
			query: {
				animal: 'dog',
			},
		});
		await userHandlerPost(req, res);
		expect(axios.config.url).toStrictEqual(
			'http://localhost:6001/api/v1/user/',
		);
	});
});
