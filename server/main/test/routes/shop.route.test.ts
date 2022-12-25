import request from 'supertest';
import { connectDb, server } from "../../src";
import { Order } from "@prisma/client";
import prisma from "@cd/data-access";

let app = request(server);

beforeAll(() => {
    connectDb(prisma)
})

describe('GET ordersByOrg', function() {
    it('responds with 200, & json response', async function () {
        await app
        .get('/api/v1/shop/orders:2')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            expect(response.body)
        })
    });
});
