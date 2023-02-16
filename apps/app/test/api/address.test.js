// import ordersHandler from '../../pages/api/orders';
// import axios from 'axios';
// import { createMocks } from 'node-mocks-http';
// import { urlBuilder } from '../../src/utils';

// beforeAll(() => {
//     jest.mock('axios');
// });

// // call handle, and expect the correct backend server call
// // issue here, is getting the correct organizationId from the session object, and getting it in axios call.
// // maybe mock the session
// // another issue is the caching that happens on the handler side, can interfere with test


// describe('POST /api/users/2/address', () => {
//     test('add address return the correct server call with params', async () => {
//         const { req, res } = createMocks({
//             method: 'GET',
//             query: {
//                 animal: 'dog',
//             },
//         });
//         await ordersHandler(req, res);
//         expect(axios).toHaveBeenLastCalledWith(urlBuilder.main.ordersByOrgId('3'));
//     });
// });

// describe('DELETE /api/users/2/address/3', () => {
//     test('delete address return the correct server call with params', async () => {
//         const { req, res } = createMocks({
//             method: 'GET',
//             query: {
//                 animal: 'dog',
//             },
//         });
//         await ordersHandler(req, res);
//         expect(axios).toHaveBeenLastCalledWith(urlBuilder.main.ordersByOrgId('3'));
//     });
// });
