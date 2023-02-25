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

describe('POST /login', function () {
    test('responds with 200, returns user json', async function () {
        await app
            .get('/api/v1/organization/2')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toBeDefined();
            });
    });
});
describe('GET /logout', function () {
    test('/200, revokes session', async function () {
        await app
            .get('/api/v1/organization/2')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toBeDefined();
            });
    });
});

describe('GET /userbyId', function () {
    test('/2 responds with 200, & json response', async function () {
        await app
            .get('/api/v1/organization/2')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toBeDefined();
            });
    });
});

describe('GET addressById', function () {
    test('/2/categories responds with 200, & json response', async function () {
        await app
            .get('/api/v1/organization/2/categories')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toBeDefined();
            });
    });
});

describe('POST addAddressToUser', function () {
    test('/2/categories responds with 200, & json response', async function () {
        await app
            .get('/api/v1/organization/2/categories')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toBeDefined();
            });
    });
});

// describe('DELETE addressByIdAndUser', function () {
//     test('/product/update responds with 200, & json response', async function () {
//         await app
//             .get('/api/v1/organization/product/update')
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .then((response) => {
//                 expect(response.body).toBeDefined();
//             });
//     });
// });
