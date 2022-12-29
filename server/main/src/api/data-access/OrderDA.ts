import prisma, { findOrderWithDetails, updateOrder } from "@cd/data-access"

/* =================================
Order Data Access - data class for order table

members: 
getOrdersByOrg
getOrderById
updateOrderById
================================= */

export default class OrderDA {

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
    const data = await findOrderWithDetails(id)
    return data
  }

  static async updateOrderById(order) {
    const data = await updateOrder(order)
    return data
  }
}
