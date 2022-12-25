let collections = {
  orders: 'order'
}

let orders

/* =================================
Order Data Access - data class for order table

members: 
getOrdersByOrg
================================= */

export default class OrderDA {
  static async injectDB(conn) {
    try {
      // if (orders) {
      //   return;
      // }
      orders = conn[collections.orders]
    } catch (error) {
      console.error(`Unable to establish database handles in DriverDA: ${error}`);
    }
  }

  static async getOrdersByOrg(organizationId) {
    return await orders.findMany(
      {
        where:
          { organizationId },
        orderBy: [
          { updatedAt: 'desc' }
        ]
      }
    ) || []
  }
}
