import request from 'supertest';
import { connectDb, server } from "../../src";
import prisma, { OrderUpdate } from "@cd/data-access";

let app = request(server);

beforeAll(() => {
    connectDb(prisma)
})

// test get queries only
// data manipulation tests are mocked in data-access lib

// i can mock these routes much easier, by mocking the controller function being called

describe('GET ordersByOrg', function() {
    test('/orders/org/2 responds with 200, & json response', async function () {
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
    test('/orders/3 responds with 200, & json response', async function () {
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

describe('Update orderById', function() {
    test('/orders responds with 200, & json response', async function () {
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

describe('GET productsByOrg', function() {
    test('/products/org/2 responds with 200, & json response', async function () {
        await app
        .get('/api/v1/shop/products/org/2')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            expect(response.body).toBeDefined()
        })
    });
});

describe('GET productById', function() {
    test('/products/3 responds with 200, & json response', async function () {
        await app
        .get('/api/v1/shop/products/3')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            expect(response.body).toBeDefined()
        })
    });
});

describe('Search products', function() {
    test('/products responds with 200, & json response', async function () {
        let search = 'OG'
        let organizationId = '3'
        await app
        .post('/api/v1/shop/products')
        .set('Accept', 'application/json')
        .send({ search, organizationId })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            expect(response.body).toBeDefined()
        })
    });
});
