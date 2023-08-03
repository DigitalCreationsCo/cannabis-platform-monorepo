import { urlBuilder } from '@cd/core-lib';
import axios from 'axios';
import { createMocks } from 'node-mocks-http';
import addressHandlerPost from '../../../src/pages/api/user/[id]/address';

beforeAll(() => {
	jest.mock('axios');
});

describe('POST /api/users/2/address', () => {
	it('add address return the correct server call with params', async () => {
		const { req, res } = createMocks({
			method: 'GET',
			query: {
				animal: 'dog',
			},
		});
		await addressHandlerPost(req, res);
		expect(axios).toHaveBeenLastCalledWith(
			urlBuilder.main.ordersByOrgId('3')
		);
	});
});

describe('DELETE /api/users/2/address/3', () => {
	it('delete address calls the correct api with params', async () => {
		const mockGetHandler = jest.fn(async (req, res) => {
			const { id } = req.query;
			const response = await axios(urlBuilder.main.userById(id));
			res.end();
		});

		const { req, res } = createMocks({
			method: 'GET',
			query: {
				animal: 'dog',
			},
		});
		await mockGetHandler(req, res);
		expect(axios).toHaveBeenLastCalledWith(
			urlBuilder.main.ordersByOrgId('3')
		);
	});
});
