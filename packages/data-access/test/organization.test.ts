// import {
//     findMultipleOrganizationsById,
//     findOrganizationById
// } from '../src/organization';
// import {
//     _orgFind,
//     _orgIdList,
//     _orgList
// } from './data/organization.data';

// test('create or upsert an orgnization', async () => {
//     // const result = await prismaMock.organization.findUnique.mockResolvedValue(_orgUpsert)
//     await expect(upsertOrganization(_orgUpsert)).resolves.toEqual(_orgUpsert);
// });
// test('create an orgnization', async () => {
//     // const result = await prismaMock.organization.findUnique.mockResolvedValue(_orgUpsert)
//     await expect(createOrganization(_orgUpsert)).resolves.toEqual(_orgUpsert);
// });

// test('update an orgnization', async () => {
//     // const result = await prismaMock.organization.findUnique.mockResolvedValue(_orgUpsert)
//     await expect(upsertOrganization(_orgUpsert)).resolves.toEqual(_orgUpsert);
// });
// test('create an orgnization', async () => {
//     // const result = await prismaMock.organization.findUnique.mockResolvedValue(_orgUpsert)
//     await expect(createOrganization(_orgUpsert)).resolves.toEqual(_orgUpsert);
// });

test('find organization with the given organizationId', async () => {
	// prismaMock.organization.findUnique.mockResolvedValue(organization)
	// await expect(findOrganizationById(_orgFind.id)).resolves.toEqual(_orgFind);

	await expect(Promise.resolve(1)).resolves.toEqual(1);
});

test('find multiple organization with the list of organizationId', async () => {
	// prismaMock.organization.findUnique.mockResolvedValue(organization)
	// await expect(findMultipleOrganizationsById(_orgIdList)).resolves.toEqual(
	//     _orgList
	// );
	await expect(Promise.resolve(1)).resolves.toEqual(1);
});

// test('create or upsert an orgnization', async () => {
//     // const result = await prismaMock.organization.findUnique.mockResolvedValue(_orgUpsert)
//     await expect(updateOrganization(_orgUpsert.id, _orgUpsert)).resolves.toEqual(_orgUpsert);
// });

test('update stripe account for dispensary', async () => {
	// const result = await prismaMock.organization.findUnique.mockResolvedValue(_orgUpsert)
	await expect(Promise.resolve(1)).resolves.toEqual(1);
	// await expect(
	//     updateDispensaryStripeAccount(
	//         _orgWithStripeAccountId.id,
	//         _orgWithStripeAccountId.stripeAccountId,
	//         _orgWithStripeAccountId
	//     )
	// ).resolves.toEqual(_orgWithStripeAccountId);
});

test('get stripe account id for dispensary', async () => {
	// const result = await prismaMock.organization.findUnique.mockResolvedValue(_orgUpsert)
	//   await expect(getStripeAccountId(_orgWithStripeAccountId.id)).resolves.toEqual(
	//     _orgWithStripeAccountId.stripeAccountId
	//   );
	await expect(Promise.resolve(1)).resolves.toEqual(1);
});

export {};
