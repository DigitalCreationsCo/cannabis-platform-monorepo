import request from 'supertest';

describe('Production Server Healthchecks', function () {
	console.info('Production backend url: ', process.env.BACKEND_URL);

	test('/main/api/v1/healthcheck responds with 200 & server status', async function () {
		request('https://backend.grascannabis.org')
			.get('/main/api/v1/healthcheck')
			.end(function (err, res) {
				if (err) throw err;
			})
			.expect(200)
			.then((response) => {
				expect(response.body).toBe({ status: 'OK', server: 'main' });
			});
	});
});
