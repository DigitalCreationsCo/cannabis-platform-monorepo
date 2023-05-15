import { findOrganizationById } from '../src/organization.js';

test('find organization with the given organizationId', async () => {
    const organization = {
       id:'2'
    };

    // prismaMock.organization.findUnique.mockResolvedValue(organization)
    await expect(findOrganizationById('2')).resolves.toEqual(organization);
});
