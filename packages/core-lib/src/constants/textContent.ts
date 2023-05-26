const TextContent = Object.freeze({
    ACCEPT_ORDER: "Do you want to accept the order?",
    ADD_TO_CART_f: (qty) => `Add ${qty} to Bag`,
    ADDRESS_BLOCK_f: (destination) =>
      `${destination.address.street1} ${destination.address.street2}\n${destination.address.city}, ${
        destination.address.state
      } ${destination.address.zipcode.split("-")[0]}`,
    ALL_ORDERS: "Your Delivery Queue",
    BROWSE_VENDOR_f: (vendorName) => `Browse ${vendorName}`,
    CART_TITLE: "My Bag",
    CHECKOUT: "checkout",
    CONFIRM_ADD_TO_CART: `Your bag contains an item from another shop.
    Do you want to empty the bag and add this item instead?`,
    CUSTOMER_ORDER_f: (customerName) => `${customerName} placed an order`,
    DELIVERING_TO_ADDRESS_f: (location) =>
      `Delivering to ${location?.street}, ${location?.city}, ${location?.state}`,
    DELIVERY_COMPLETE: "Your order was delivered!",
    DRIVER_ADDED: "A driver has started your delivery!",
    DRIVER_ARRIVED_TO_VENDOR_f: (driverName) =>
      `${driverName} has arrived to the vendor!`,
    DRIVER_ARRIVED_TO_CUSTOMER_f: (driverName) =>
      `${driverName} has arrived with your order!`,
    DRIVER_INFO_f: (driverName) => `${driverName} is delivering your order`,
    DRIVER_PICKUP_PRODUCT_f: (driverName) =>
      `${driverName} has picked up your product!`,
    DRIVER_SEARCH: "Searching for a driver...",
    FAVORITE_PRODUCTS: "Your Favorites",
    FAVORITE_PRODUCTS_LIST_TITLE: "Your Favorites",
    FAVORITES_TEXT: "Your favorite items will list here",
    FRIENDS_LIST_TITLE: "Your friends",
    LOADING: "Loading...",
    LOGOUT: "logout",
    ORDER_NUM_f: (numOrders) =>
      `${numOrders} ${numOrders > 1 ? "deliveries" : "delivery"} in queue`,
    ORDERED_FROM_VENDOR_f: (vendorName) => `Ordered from ${vendorName}`,
    ORDERING_FROM_VENDOR_f: (vendorName) => `Ordering from ${vendorName}`,
    ORDER_INFO_HEADER: "Here's your order info",
    PAYMENT_SUCCESSFUL:
      "Your order has been placed! A driver is being called for your delivery",
    PAYMENT_NOT_PROCESSED:
      "Your payment could not be processed. Please try again later. Thank you!",
    PAYMENT_SERVICE_NOT_AVAILABLE:
      "Payments are not available now. Please try again later. Thank you!",
    PRODUCTS_NOT_AVAILABLE: "No products are available yet! Come back later!",
    PURCHASE: "place an order",
    READ_REVIEWS: "Read Reviews",
    REMOVE_ITEM: "Remove Item",
    REVIEWS_CAPTION: "What's the word on this product?",
    SEE_ORDERS: "See your orders",
    SELECT_LOCATION_TYPE: "Where can we deliver your next order?",
    SET_HOME_LOCATION: "We'll send your next delivery to Home.",
    SET_CURRENT_LOCATION:
      "Got it! We'll send your next delivery to your current spot.",
    SET_GIFT_LOCATION: "We'll send your next delivery to your friend!",
  
    SUBTOTAL: "subtotal",
    COMPANY_NAME: "Cannabis Delivery",
    THANK_CUSTOMER_f: (vendorName) =>
      `Thank you for shopping with ${vendorName}!`,
    TIP_CAPTION: "You can leave a tip!",
    TIP_CUSTOM: "How would you like to tip?",
    UPDATE_CART: "Update Bag",
  
    CONNECTION_ISSUE:
      "We're having trouble connecting you. Please try again later. Thank you!",
  });

  export default TextContent;