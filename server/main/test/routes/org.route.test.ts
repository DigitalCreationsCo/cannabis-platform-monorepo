import request from 'supertest';
import { connectDb, server } from '../../src';

let app = request(server);

beforeAll(() => {
    connectDb();
});

// test get queries only
// data manipulation tests are mocked in data-access lib

// i can mock these routes much easier, by mocking the controller function being called

describe('POST organization', function () {
    test('/ responds with 201 Created, & json response', async function () {
        await app
            .get('/api/v1/organization/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toBeDefined();
            });
    });
});

describe('PUT organization', function () {
    test('/ responds with 201 Created, & json response', async function () {
        await app
            .put('/api/v1/organization/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toBeDefined();
            });
    });
});

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
describe('GET organization', function () {
    test('/2 responds with 404, & null response if organization is not found', async function () {
        await app
            .get('/api/v1/organization/2')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
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


describe('GET CATEGORIES', function () {
    test('/2/categories return with empty array, if the org is found and no users are found, & json response', async function () {
        await app
            .get('/api/v1/organization/2/categories')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
            .then((response) => {
                expect(response.body).toBeDefined();
                // expect to be typeof Users[]
            });
    });
});

describe('GET categories', function () {
    test('/2/categories with 404, if the org id is not found, & json response', async function () {
        await app
            .get('/api/v1/organization/2/categories')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
            .then((response) => {
                expect(response.body).toBeDefined();
                // expect to be typeof Users[]
            });
    });
});

describe('GET categories', function () {
    test('/2/categories with bad request body responds with 500, & json response', async function () {
        await app
            .get('/api/v1/organization/2/categories')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(500)
            .then((response) => {
                expect(response.body).toBeDefined();
                // expect to be typeof Users[]
            });
    });
});


describe('GET USERS', function () {
    test('/2/users responds with 200, & json response', async function () {
        await app
            .get('/api/v1/organization/2/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toBeDefined();
                // expect to be typeof Users[]
            });
    });
});

describe('GET USERS', function () {
    test('/2/users return with empty array, if the org is found and no users are found, & json response', async function () {
        await app
            .get('/api/v1/organization/2/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
            .then((response) => {
                expect(response.body).toBeDefined();
                // expect to be typeof Users[]
            });
    });
});

describe('GET USERS', function () {
    test('/2/users with 404, if the org id is not found, & json response', async function () {
        await app
            .get('/api/v1/organization/2/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
            .then((response) => {
                expect(response.body).toBeDefined();
                // expect to be typeof Users[]
            });
    });
});

describe('GET USERS', function () {
    test('/2/users with bad request body responds with 500, & json response', async function () {
        await app
            .get('/api/v1/organization/2/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(500)
            .then((response) => {
                expect(response.body).toBeDefined();
                // expect to be typeof Users[]
            });
    });
});

// describe('PUT updateProduct', function () {
//     test('/product/2/update-product responds with 200, & json response', async function () {
//         await app
//             .get('/api/v1/organization/product/2/update-product')
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
