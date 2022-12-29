import request from 'supertest';
import { connectDb, server } from "../../src";
import prisma, { OrderUpdate } from "@cd/data-access";

let app = request(server);

beforeAll(() => {
    connectDb(prisma)
})

// test get queries only
// data manipulation tests are mocked in data-access lib

describe('GET ordersByOrg', function() {
    test('org/2 responds with 200, & json response', async function () {
        await app
        .get('/api/v1/shop/orders/org/2')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            expect(response.body).toBeDefined()
        })
    });
});

describe('GET orderById', function() {
    test('/3 responds with 200, & json response', async function () {
        await app
        .get('/api/v1/shop/orders/3')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            expect(response.body).toBeDefined()
        })
    });
});

describe('UPDATE orderById', function() {
    test('responds with 200, & json response', async function () {
        let update:OrderUpdate = {id: '3'}
        await app
        .put('/api/v1/shop/orders')
        .set('Accept', 'application/json')
        .send(update)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            expect(response.body).toBeDefined()
        })
    });
});
