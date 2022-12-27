// import { Order, OrderItem, User, Driver, Address, Organization, Product } from "@prisma/client";

// export type OrderDetail = Order & {
//   items: OrderItem[];
//   customer: User;
//   driver: Driver;
//   deliveryInfo: Address;
//   organization: Organization;
// }

// export type OrderItemDetail = {
//   product?: Product;
// }

export { default } from "./prisma";
export * from "@prisma/client";