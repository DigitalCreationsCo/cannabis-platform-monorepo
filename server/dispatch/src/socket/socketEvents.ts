const SocketEvents = Object.freeze({
  connection: "connection",
  customerConnect: "customer_connect",
  driverConnect: "driver_connect",
  vendorConnect: "vendor_connect",

  clientConnect: "client_connect",
  disconnect: "disconnect",

  newOrder: "new_order",
  acceptOrder: "accept_delivery_order",
  declineOrder: "decline_delivery_order",
  orderAssigned: "order_assigned",
  orderAssignedToAnotherDriver: "order_assigned_to_another_driver",
  getLocation: "get_location",

  driverAdded: "driver_added",
  sendLocation: "location_share",

  message: "message",
  navigate: "navigate",

  NavigateEvent: {
    ToVendor: "NAVIGATE_TO_VENDOR",
    ToCustomer: "NAVIGATE_TO_CUSTOMER",
    ArriveVendor: "ARRIVE_TO_VENDOR",
    PickupProduct: "PICKUP_PRODUCT",
    ArriveCustomer: "ARRIVE_TO_CUSTOMER",
    DeliverOrder: "DELIVER_PRODUCT",
  },
});

export { SocketEvents };
