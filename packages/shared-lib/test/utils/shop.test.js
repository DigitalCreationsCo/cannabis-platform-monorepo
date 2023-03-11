const { checkDispensaryIsOpen } = require("@cd/shared-lib");

describe('checkDispensaryIsOpen', () => {
    test('live date', async () => {
        const isOpen = checkDispensaryIsOpen({
            days: 6543210,
            id: '1',
            organizationId: '2',
            openAt: 8,
            closeAt: 20,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        expect(isOpen).toEqual(true);
    });
});
