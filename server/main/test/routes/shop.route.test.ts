import request from 'supertest';
import { connectDb, server } from "../../src";
import prisma, { Order }  from "@cd/data-access";

let app = request(server);

beforeAll(() => {
    connectDb(prisma)
})

describe('GET ordersByOrg', function() {
    it('responds with 200, & json response', async function () {
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
    it('responds with 200, & json response', async function () {
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
