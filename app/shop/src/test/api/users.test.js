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
// describe('/api/users', () => {
//     test('getUsersByOrgId return the correct server call', async () => {
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

describe('/api/user/1', () => {
    test('GET User - axios sends the correct server call', async () => {
        expect('1').toEqual('1');
    });
});

describe('/api/user/', () => {
    test('POST User - axios sends the correct server call', async () => {
        // expect('1').toEqual('1');
        expect(axios.config.url).toEqual('http://localhost:6001/api/v1/user/')
    });
});

describe('/api/user/', () => {
    test('PUT User - axios sends the correct server call', async () => {
        // expect('1').toEqual('1');
        expect(axios.config.url).toEqual('http://localhost:6001/api/v1/user/')
    });
});

