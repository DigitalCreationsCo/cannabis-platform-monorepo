var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { updateOrder } from '../order';
import { OrderStatus } from '@prisma/client';
test('update an order with the given values', () => __awaiter(void 0, void 0, void 0, function* () {
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
    };
    // prismaMock.order.update.mockResolvedValue(order)
    yield expect(updateOrder(Object.assign(Object.assign({}, order), { total: 8999 }))).resolves.toEqual(Object.assign(Object.assign({}, order), { total: 8999 }));
}));
