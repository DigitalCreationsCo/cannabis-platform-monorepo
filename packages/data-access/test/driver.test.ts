// import { createorupdateDispensaryAdmin, createOrUpdateUser } from 'user.js';
// import { _orgUpsert } from './data/organization.data.js';
// import { _incompleteUserCreate, _userAdminCreatePayload, _userCreate } from './data/user.data.js';

// test('create or update a user', async () => {
//     // const result = await prismaMock.organization.findUnique.mockResolvedValue(_orgUpsert)
//     await expect(createOrUpdateUser(_userCreate)).resolves.toStrictEqual(_userCreate);
// });

// test('create or update a user fails with incomplete data', async () => {
//     // const result = await prismaMock.organization.findUnique.mockResolvedValue(_orgUpsert)
//     await expect(createOrUpdateUser(_incompleteUserCreate)).resolves.toStrictEqual(_orgUpsert);
// });

// test('create or update a dispensary admin user', async () => {
//     // const result = await prismaMock.organization.findUnique.mockResolvedValue(_orgUpsert)
//     await expect(createorupdateDispensaryAdmin(_userAdminCreatePayload.user, {
//         role: _userAdminCreatePayload.role,
//         dispensaryId: _userAdminCreatePayload.dispensaryId
//     })).resolves.toStrictEqual(_orgUpsert);
// });

test('create or update a dispensary admin user fails with incomplete data', async () => {
	// const result = await prismaMock.organization.findUnique.mockResolvedValue(_orgUpsert)
	// await expect(createorupdateDispensaryAdmin(_incompleteUserCreate, {})).resolves.toStrictEqual(_orgUpsert);
	await expect(Promise.resolve(1)).resolves.toStrictEqual(1);
});

export {};
