// import axios from 'axios';
// import { createMocks } from 'node-mocks-http';
// import { urlBuilder } from '../../src/utils';

// beforeAll(() => {
//     jest.mock('axios');
// });

// mock supertokens
// send a cookie to the supertokens mock, to get a session
// if the refreshtoken is valid,
// TEST FOR THE RESPONSE MESSAGE OR ERROR

// describe('GET /api/session', () => {
//     test('get session or return session error', async () => {
//         const { req, res } = createMocks({
//             method: 'GET',
//             query: {
//                 animal: 'dog',
//             },
//         });
//         expect(axios).toHaveBeenLastCalledWith(urlBuilder.main.ordersByOrgId('3'));
//     });
// });
