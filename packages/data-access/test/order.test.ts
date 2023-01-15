import { OrderStatus } from '@prisma/client';
import { updateOrderWithOrderItems } from '../src/order.js';

test('update an order with the given values', async () => {
    const order = {
        id: '3',
        total: 12399,
        subtotal: 12000,
        taxFactor: 0.6,
        tax: 1239,
        status: OrderStatus["Pending"],
        addressCustomerId: '1',
        customerId: '1',
        driverId: '2',
        organizationId: '2',
        isDelivered: false,
        deliveredAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }

    // prismaMock.order.update.mockResolvedValue(order)
    await expect(updateOrderWithOrderItems({ ...order, total: 8999 })).resolves.toEqual({
        ...order,
        total: 8999,
    })
})