import request from 'supertest';
import { server } from '../../src';

let app = request(server);

describe('getSession', function () {
    test('/ responds 200 status and session information', async function () {
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
