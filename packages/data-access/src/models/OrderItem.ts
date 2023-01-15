import { CurrencyName, ProductVariant, Unit } from "@prisma/client";
import { OrderItemWithDetails } from "../order";

export default class OrderItemWithDetailsClass {
    productVariant: ProductVariant
    orderId: string
    variantId: string
    name: string
    unit: Unit
    size: number
    quantity: number
    basePrice: number
    discount: number
    salePrice: number
    currency: CurrencyName
    createdAt: Date
    updatedAt: Date
    constructor(orderItemData: OrderItemWithDetails) {
        this.productVariant = orderItemData.productVariant
        this.orderId = orderItemData.orderId
        this.variantId =         orderItemData.variantId
        this.name =         orderItemData.name
        this.unit =         orderItemData.unit
        this.size =         orderItemData.size
        this.quantity =         orderItemData.quantity
        this.basePrice =         orderItemData.basePrice
        this.discount =         orderItemData.discount
        this.salePrice =         orderItemData.salePrice
        this.currency =         orderItemData.currency
        this.createdAt =         orderItemData.createdAt
        this.updatedAt =         orderItemData.updatedAt
    }
}