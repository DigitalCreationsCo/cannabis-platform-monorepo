import { checkIsDispensaryOpen } from '../utils/schedule';

describe('checkIsDispensaryOpen', () => {
    const now = new Date(),
        open = new Date(),
        close = new Date();

    open.setHours(8);
    close.setHours(20);

    const _isOpenCurrenTime =
        [6, 5, 4, 3, 2, 1, 0].includes(now.getDay()) && now > open && now < close;

    test('is open', async () => {
        const isOpen = checkIsDispensaryOpen({
            days: 6543210,
            id: '1',
            organizationId: '2',
            openAt: 8,
            closeAt: 20,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        expect(isOpen).toEqual(_isOpenCurrenTime);
    });
});
