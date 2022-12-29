var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { Unit, Currency } from "@prisma/client";
import prisma from "../prisma";
export function createOrder() {
    return __awaiter(this, void 0, void 0, function* () { });
}
export function findOrderWithDetails(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const order = yield prisma.order.findUnique({
            where: { id },
            include: {
                customer: true,
                driver: true,
                deliveryInfo: true,
                items: { include: { product: { include: { images: true } } } }
            }
        });
        return order;
    });
}
// export interface OrderDetail extends Order {
//     items?: Prisma.OrderItemUpdateInput;
//     customer?: Prisma.UserUpdateInput;
//     driver?: Prisma.DriverUpdateInput;
//     deliveryInfo?: any;
//     organization?: any;
// }
// export type OrderItemDetail = {
//   product?: Product;
// }
export function updateOrder(order) {
    return __awaiter(this, void 0, void 0, function* () {
        const updateItems = order.items.map((item) => {
            let { createdAt, updatedAt } = item, rest = __rest(item, ["createdAt", "updatedAt"]);
            const update = {
                create: Object.assign(Object.assign({}, rest), { unit: Unit[item.unit], currency: Currency[item.currency] }),
                update: Object.assign(Object.assign({}, rest), { unit: Unit[item.unit], currency: Currency[item.currency], createdAt }),
                where: { productId: item.productId }
            };
            return update;
        });
        delete order['createdAt'];
        delete order['updatedAt'];
        delete order['items'];
        console.log('order!!: ', order);
        const update = yield prisma.order.update({
            where: {
                id: order.id
            },
            data: Object.assign(Object.assign({}, order), { items: {
                    upsert: updateItems
                } }),
        });
        return update;
    });
}
export function deleteOrder() {
    return __awaiter(this, void 0, void 0, function* () { });
}
