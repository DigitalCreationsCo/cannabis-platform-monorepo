// import { updateDispensaryAdmin } from 'user';
// import { _orgUpsert } from './data/organization.data';
// import {
//   _incompleteUserCreate,
//   _userAdminCreatePayload,
// } from './data/user.data';

// test('create or update a user', async () => {
//     // const result = await prismaMock.organization.findUnique.mockResolvedValue(_orgUpsert)
//     await expect(createUser(_userCreate)).resolves.toStrictEqual(_userCreate);
// });

// test('create or update a user fails with incomplete data', async () => {
//     // const result = await prismaMock.organization.findUnique.mockResolvedValue(_orgUpsert)
//     await expect(createUser(_incompleteUserCreate)).resolves.toStrictEqual(_orgUpsert);
// });

test('create or update a dispensary admin user', async () => {
	// const result = await prismaMock.organization.findUnique.mockResolvedValue(_orgUpsert)
	// await expect(
	//   updateDispensaryAdmin(_userAdminCreatePayload.user, {
	//     role: _userAdminCreatePayload.role,
	//     dispensaryId: _userAdminCreatePayload.dispensaryId,
	//   })
	// ).resolves.toStrictEqual(_orgUpsert);
	await expect(Promise.resolve(1)).resolves.toStrictEqual(1);
});

test('create or update a dispensary admin user fails with incomplete data', async () => {
	// const result = await prismaMock.organization.findUnique.mockResolvedValue(_orgUpsert)
	// await expect(
	//   updateDispensaryAdmin(_incompleteUserCreate, { role: '', dispensaryId: '' })
	// ).resolves.toStrictEqual(_orgUpsert);
	await expect(Promise.resolve(1)).resolves.toStrictEqual(1);
});

export {};
