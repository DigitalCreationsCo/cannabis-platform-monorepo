import { createOrganization, findMultipleOrganizationsById, findOrganizationById, getStripeAccountId, updateOrganizationRecord, updateStripeAccountDispensary, upsertOrganization } from '../src/organization.js';
import { _orgFind, _orgIdList, _orgList, _orgUpsert, _orgWithStripeAccountId } from './data/organization.data.js';

test('create or upsert an orgnization', async () => {
    // const result = await prismaMock.organization.findUnique.mockResolvedValue(_orgUpsert)
    await expect(upsertOrganization(_orgUpsert)).resolves.toEqual(_orgUpsert);
});
test('create an orgnization', async () => {
    // const result = await prismaMock.organization.findUnique.mockResolvedValue(_orgUpsert)
    await expect(createOrganization(_orgUpsert)).resolves.toEqual(_orgUpsert);
});

test('find organization with the given organizationId', async () => {
    // prismaMock.organization.findUnique.mockResolvedValue(organization)
    await expect(findOrganizationById(_orgFind.id)).resolves.toEqual(_orgFind);
});

test('find multiple organization with the list of organizationId', async () => {

    // prismaMock.organization.findUnique.mockResolvedValue(organization)
    await expect(findMultipleOrganizationsById(_orgIdList)).resolves.toEqual(_orgList);
});

test('create or upsert an orgnization', async () => {
    // const result = await prismaMock.organization.findUnique.mockResolvedValue(_orgUpsert)
    await expect(updateOrganizationRecord(_orgUpsert.id, _orgUpsert)).resolves.toEqual(_orgUpsert);
});

test('update stripe account for dispensary', async () => {
    // const result = await prismaMock.organization.findUnique.mockResolvedValue(_orgUpsert)
    await expect(updateStripeAccountDispensary(_orgWithStripeAccountId.id, _orgWithStripeAccountId.stripeAccountId, _orgWithStripeAccountId)).resolves.toEqual(_orgWithStripeAccountId);
});

test('get stripe account id for dispensary', async () => {
    // const result = await prismaMock.organization.findUnique.mockResolvedValue(_orgUpsert)
    await expect(getStripeAccountId(_orgWithStripeAccountId.id)).resolves.toEqual(_orgWithStripeAccountId.stripeAccountId);
});
