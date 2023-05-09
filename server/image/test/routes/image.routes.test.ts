import request from 'supertest';
import { server } from "../../src";

let app = request(server);

describe('POST scan-identification-upload', function() {
    test('/image/scan-identification-upload responds with 200, & json response', async function () {
        await app
        .post('/api/v1/image/scan-identification-upload')
        .expect(200)
        .then((response) => {
            expect(response.body).toBeDefined()
        })
    });
});

describe('POST scan-identification-uri', function() {
    test('/api/v1/image/scan-identification-uri responds with 200, & json response', async function () {
        await app
        .post("/api/v1/image/scan-identification-uri")
        .expect(200)
        .then((response) => {
            expect(response.body).toBeDefined()
        })
    });

    test('/scan-identification-upload uploads no image in the request')
    test('/scan-identification-upload uploads a non-image file in the request')
    test('/scan-identification-upload uploads an image that is not an id photo')
});