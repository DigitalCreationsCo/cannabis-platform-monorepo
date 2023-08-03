import prisma from '@cd/data-access';
import request from 'supertest';
import { connectDb, server } from '../../src';

let app = request(server);

beforeAll(() => {
	connectDb(prisma);
});

// test get queries only
// data manipulation tests are mocked in data-access lib

// i can mock these routes much easier, by mocking the controller function being called

describe('GET addressById', function () {
	test('/user/2/address/1 responds with 200, & json response', async function () {
		await app
			.get('/api/v1/auth/user/2/address/1')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.then((response) => {
				expect(response.body).toBeDefined();
			});
	});
});
