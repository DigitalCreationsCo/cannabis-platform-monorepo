"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OrderItemWithDetailsClass = /** @class */ (function () {
    function OrderItemWithDetailsClass(orderItemData) {
        this.productVariant = orderItemData.productVariant;
        this.orderId = orderItemData.orderId;
        this.variantId = orderItemData.variantId;
        this.name = orderItemData.name;
        this.unit = orderItemData.unit;
        this.size = orderItemData.size;
        this.quantity = orderItemData.quantity;
        this.basePrice = orderItemData.basePrice;
        this.discount = orderItemData.discount;
        this.salePrice = orderItemData.salePrice;
        this.currency = orderItemData.currency;
        this.createdAt = orderItemData.createdAt;
        this.updatedAt = orderItemData.updatedAt;
    }
    return OrderItemWithDetailsClass;
}());
exports.default = OrderItemWithDetailsClass;
