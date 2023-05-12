import { deleteAddressByIdAndUser, findAddressByIdAndUser } from '../src/address.js';

test('add address with userId', async () => {
    const address = {
       ...
    };

    // prismaMock.organization.findUnique.mockResolvedValue(address)
    await expect(findAddressByIdAndUser({addressId: '2', id: '1'})).resolves.toEqual(address);
});

test('find address with the given addressId', async () => {
    const address = {
       ...
    };

    // prismaMock.organization.findUnique.mockResolvedValue(organization)
    await expect(findAddressByIdAndUser({addressId: '2', id: '1'})).resolves.toEqual(address);
});


test('find address with the given userId', async () => {
    const address = {
       ...
    };

    // prismaMock.organization.findUnique.mockResolvedValue(organization)
    await expect(findAddressByIdAndUser({addressId: '2', id: '1'})).resolves.toEqual(address);
});

test('find address with the given addressId and userId', async () => {
    const address = {
       ...
    };

    // prismaMock.organization.findUnique.mockResolvedValue(organization)
    await expect(findAddressByIdAndUser({addressId: '2', id: '1'})).resolves.toEqual(address);
});

test('delete address with the given addressId and userId', async () => {
    const address = {
       ...
    };

    // prismaMock.organization.findUnique.mockResolvedValue(organization)
    await expect(deleteAddressByIdAndUser({addressId: '2', id: '1'})).resolves.toEqual(address);
});
