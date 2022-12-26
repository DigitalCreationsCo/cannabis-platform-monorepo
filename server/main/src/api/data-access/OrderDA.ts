import prisma from "@cd/data-access"

let collections = {
  orders: 'order'
}

let orders

/* =================================
Order Data Access - data class for order table

members: 
getOrdersByOrg
getOrderById
================================= */

export default class OrderDA {
  // static async injectDB(conn) {
  //   try {
  //     // if (orders) {
  //     //   return;
  //     // }
  //     orders = conn[collections.orders]
  //   } catch (error) {
  //     console.error(`Unable to establish database handles in DriverDA: ${error}`);
  //   }
  // }

  static async getOrdersByOrg(organizationId) {
    const data = await prisma.order.findMany(
      {
        where:
          { organizationId },
        orderBy: [
          { updatedAt: 'desc' }
        ]
      }
    ) || [];
    return data
  }

  static async getOrderById(id) {
    const data = await prisma.order.findUnique(
      {
        where: { id: '1' },
        include: { items: { include: { product: { include: { images: true } } } } }
      }
    )
    return data
  }
}
