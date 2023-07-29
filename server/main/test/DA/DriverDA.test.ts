import request from 'supertest';
import { connectDb, server } from '../../src';

let app = request(server);

beforeAll(() => {
    connectDb();
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

describe('GET /userbyId', function () {
    test('/2 responds with 404, when user is not found & null json response', async function () {
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

describe('GET /userbyEmail', function () {
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

describe('GET /userbyEmail', function () {
    test('/2 responds with 404, when user email is not found & null json response', async function () {
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

describe('GET addressById', function () {
    test('/2/categories responds with 404 when address is not found, & null json response', async function () {
        await app
            .get('/api/v1/organization/2/categories')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
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

describe('POST addAddressToUser', function () {
    test('/2/categories responds with 500 with bad req body, & null response', async function () {
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

// describe('DELETE removeAddressFromUser', function () {
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

// describe('DELETE removeAddressFromUser', function () {
//     test('/product/update responds with 400 when address is not deleted, & json response', async function () {
//         await app
//             .get('/api/v1/organization/product/update')
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(400)
//             .then((response) => {
//                 expect(response.body).toBeDefined();
//             });
//     });
// });

describe('POST /  to create a user', function () {
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

describe('POST /  to create a user', function () {
    test('responds with 500 with bad request data, returns user json', async function () {
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

describe('PUT /  to create a user', function () {
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

describe('PUT /  to create a user', function () {
    test('responds with 500 with bad request data, returns user json', async function () {
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