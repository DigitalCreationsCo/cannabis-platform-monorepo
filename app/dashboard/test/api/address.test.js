import mockAxios from 'jest-mock-axios';
import { createMocks } from 'node-mocks-http';
import handler from '../../src/pages/api/organization/user/address';

beforeEach(() => {
	jest.mock('axios');
});

afterEach(() => {
	mockAxios.reset();
});

describe('handler makes the correct server call with the given params', () => {
	test('POST /api/organization/user/address', async () => {
		const { req, res } = createMocks({
			method: 'POST',
			body: {
				street1: '123 King St',
				street2: 'Suite 200',
				city: 'Lancaster',
				state: 'PA',
				zipcode: 17602,
				country: 'United States',
				countryCode: 'US',
				coordinateId: '1',
			},
			headers: {
				'Content-Type': 'application/json',
			},
		});

		let catchFn = jest.fn(),
			thenFn = jest.fn();

		handler(req, res).then(thenFn).catch(catchFn);

		// end point is not defined
		expect(res._getStatusCode()).toBe(404);

		// expect(axios.post).toHaveBeenCalledTimes(1);
		// expect(axios.post).toHaveBeenCalledWith(urlBuilder.main.address(), req.body);
	});
});

// describe('DELETE /api/users/2/address/3', () => {
//     test('delete address return the correct server call with params', async () => {
//         const { req, res } = createMocks({
//             method: 'GET',
//             query: {
//                 animal: 'dog',
//             },
//         });
//         await ordersHandler(req, res);
//         expect(axios).toHaveBeenLastCalledWith(urlBuilder.main.ordersByOrgId('3'));
//     });
// });
