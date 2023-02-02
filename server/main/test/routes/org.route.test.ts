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

describe('GET organization', function () {
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

describe('GET categoryList', function () {
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

// describe('PUT updateProduct', function () {
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

// describe('PUT updateProduct', function () {
//     test('/product/update responds with 404, no update when a product is not update', async function () {
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

// describe('PUT updateProduct', function () {
//     test('/product/update responds with 400, when bad data is sent', async function () {
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
