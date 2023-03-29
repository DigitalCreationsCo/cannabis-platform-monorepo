import { CurrencyName, ProductVariant, Unit } from "@prisma/client";
import { OrderItemWithDetails } from "../order";
export default class OrderItemWithDetailsClass {
    productVariant: ProductVariant;
    orderId: string;
    variantId: string;
    name: string;
    unit: Unit;
    size: number;
    quantity: number;
    basePrice: number;
    discount: number;
    salePrice: number;
    currency: CurrencyName;
    createdAt: Date;
    updatedAt: Date;
    constructor(orderItemData: OrderItemWithDetails);
}
//# sourceMappingURL=OrderItem.d.ts.map