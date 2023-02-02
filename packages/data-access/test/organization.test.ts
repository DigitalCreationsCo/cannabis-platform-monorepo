import { findOrganizationById } from '../src/organization.js';

test('find organization with the given organizationId', async () => {
    const organization = {
       ...
    };

    // prismaMock.organization.findUnique.mockResolvedValue(organization)
    await expect(findOrganizationById('2')).resolves.toEqual(organization);
});
