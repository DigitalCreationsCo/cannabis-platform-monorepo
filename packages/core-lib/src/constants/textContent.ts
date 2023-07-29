const TextContent = Object.freeze({
  prompt: {
    ACCEPT_ORDER: 'Do you want to accept the order?',
    CONFIRM_ADD_TO_CART: `Your bag contains an item from another shop.
    Do you want to empty the bag and add this item instead?`,
    CREATE_ACCOUNT: '',

    CHECKOUT_READY: "When you're ready, click the checkout button.",

    CREATE_DISPENSARY_ACCOUNT: 'Create a Dispensary account',
    CONTINUE: `When you're ready, click continue.`,
    FIND_DISPENSARY: 'Find a Dispensary',
    READ_REVIEWS: 'Read Reviews',

    FORM_FIELDS: 'Please fill out the required fields.',

    REVIEWS_CAPTION: "What's the word on this product?",
    SELECT_LOCATION_TYPE: 'Where can we deliver your next order?',
    TIP_CAPTION: 'You can leave a tip!',
    TIP_CUSTOM: 'How would you like to tip?',
    ENTER_PASSCODE: 'Enter your one time passcode',
    PASSCODE_SENT_f: (input: string) =>
      `A one time passcode is sent to ${input}`,
  },

  account: {
    ARE_YOU_A_DISPENSARY:
      'Are\xa0you\xa0a\xa0Dispensary? Get\xa0started\xa0here',
    ACCOUNT_IS_CREATED: 'Your account is created!',
    CHOOSE_PROFILE_PICTURE: 'Choose a profile picture.',
    CHOOSE_PROFILE_PICTURE_OR_UPLOAD:
      'Choose a profile picture, or upload your own.',
    CREATE_AN_ACCOUNT: 'Create an account',
    CREATE_YOUR_ACCOUNT: 'Create your account',

    CREATE_DISPENSARY_ACCOUNT: 'Create a Dispensary account',
    ABOUT_DISPENSARY_ADMIN_ACCOUNT: `Create an account to own and manage your dispensary's inventory, data, and other users. 
    This account will have the most access to your dispensary.`,
    DISPENSARY_JOINING: `We're happy you're joining us on our journey to serve the world of cannabis!`,

    DISPENSARIES_START_HERE: 'Dispensaries, get started here',
    ENTER_OR_GO_TO_ACCOUNT:
      'You can enter the Gras site, or view your account.',
    MY_ACCOUNT:
      'My Account',

    VERIFY_ID_PROCESSING: "Verifying your ID..",
    VERIFY_ID_COMPLETE: "Thanks for verifying!",
  },

  success: {
    PAYMENT_SUCCESSFUL:
      'Your order has been placed! A driver is being called for your delivery',
    HOME_LOCATION_IS_SET: "We'll send your next delivery to Home.",
    CURRENT_LOCATION_IS_SET:
      "Got it! We'll send your next delivery to your current spot.",
    GIFT_LOCATION_IS_SET: "We'll send your next delivery to your friend!",
  },

  error: {
    PAYMENT_NOT_PROCESSED:
      'Your payment could not be processed. Please try again later. Thank you!',
    PAYMENT_SERVICE_NOT_AVAILABLE:
      'Payments are not available now. Please try again later. Thank you!',
    CONNECTION_ISSUE:
      "We're having trouble connecting you. Please try again later. Thank you!",
    REQUEST_FAILED: 'Our bad, your request failed',
  },

  info: {
    COMPANY_NAME: 'Gras',
    GET_CANNABIS_DELIVERED: `Get&nbsp;Cannabis&nbsp;Delivered`,
    CANNABIS_DELIVERED: `Cannabis,${'\xa0'}Delivered.${'\xa0'}🌴🔥`,
    CANNABIS_DELIVERED_TODAY: `Cannabis,${'\xa0'}Delivered${'\xa0'}Today🌴`,
    ONE_STOP: 'a one stop cannabis marketplace',
    EMAIL: 'Email',
    THANK_YOU: `Thank you for choosing Gras!`,
    MORE_CONTENT_COMING_SOON: `Our Team is bringing you more news and content from the world of cannabis.`
  },

  ui: {
    ADD_TO_CART_f: (qty: number) => `Add ${qty} to Bag`,

    ADDRESS_BLOCK_f: (destination: any) =>
      `${destination.address.street1} ${destination.address.street2}\n${destination.address.city
      }, ${destination.address.state} ${destination.address.zipcode.split('-')[0]
      }`,

    FORM_FIELDS: 'Please fill out the required fields.',

    ITEMS: 'Items',
    LOADING: 'Loading...',
    SAVE_CHANGES: 'Save Changes',
    SIGNOUT: 'Sign out',
    SIGNIN: 'Sign In',
    SIGNIN_EMAIL: 'Sign in with your email',
    SIGNUP: 'Sign Up',
    CONTINUE: 'continue',
    BACK: 'back',
  },

  technical: {
    SHOP_WEB_APP: '',
    ADMIN_APP: '',
    DRIVER_APP: 'Delivery by Gras ',
    DELIVERY_WIDGET: '',
    MOBILE_APP: '',
  },

  warning: {},

  legal: {
    COPYRIGHT: '© 2023 Gras. All rights reserved.',
    PRIVACY_POLICY: 'Privacy Policy',
    AGREE_TO_TERMS:
      'Before creating an account with Gras, please agree to our ',
    USER_TERMS_OF_SERVICE: 'User Terms and Conditions',
    READ_USER_TERMS_OF_SERVICE:
      'Please read the Gras Terms and Conditions policy.',
    DISPENSARY_TERMS_OF_SERVICE: 'Dispensary Terms and Conditions',
    READ_DISPENSARY_TERMS_OF_SERVICE:
      'Please read the Gras Dispensary Terms and Conditions policy.',

  },

  delivery: {
    GRAS_WILL_DELIVER: 'Gras will deliver your order straight to your door.',
    DELIVER_FOR_GRAS: 'Deliver for Gras',

    ALL_ORDERS: 'Your Delivery Queue',
    CUSTOMER_ORDER_f: (customerName: string) =>
      `${customerName} placed an order`,
    DELIVERING_TO_ADDRESS_f: (location: any) =>
      `Delivering to ${location?.street}, ${location?.city}, ${location?.state}`,
    DELIVERY_COMPLETE: 'Your order was delivered!',
    DELIVER_FOR_f: (user: string) => `Delivery for ${user}`,
    DRIVER_ADDED: 'A driver has started your delivery!',
    DRIVER_ARRIVED_TO_VENDOR_f: (driverName: string) =>
      `${driverName} has arrived to the vendor!`,
    DRIVER_ARRIVED_TO_CUSTOMER_f: (driverName: string) =>
      `${driverName} has arrived with your order!`,
    DRIVER_INFO_f: (driverName: string) =>
      `${driverName} is delivering your order`,
    DRIVER_PICKUP_PRODUCT_f: (driverName: string) =>
      `${driverName} has picked up your product!`,
    DRIVER_SEARCH: 'Searching for a driver...',
    ORDER_NUM_f: (numOrders: number) =>
      `${numOrders} ${numOrders > 1 ? 'deliveries' : 'delivery'} in queue`,
    ORDERED_FROM_VENDOR_f: (vendorName: string) => `Ordered from ${vendorName}`,
    ORDERING_FROM_VENDOR_f: (vendorName: string) =>
      `Ordering from ${vendorName}`,
    ORDER_INFO_HEADER: "Here's your order info",
  },

  products: {
    ADD_PRODUCT: 'Add Product',
    FAVORITE_PRODUCTS: 'Your Favorites',
    FAVORITE_PRODUCTS_LIST_TITLE: 'Your Favorites',
    FAVORITES_TEXT: 'Your favorite items will list here',
    PRODUCTS_NOT_AVAILABLE: 'No products are available yet! Come back later!',
  },

  shop: {
    ADD_TO_CART_f: (qty: number) => `Add ${qty} to Bag`,
    BROWSE_DISPENSARY_f: (vendorName: string) => `Browse ${vendorName}`,
    CART_TITLE: 'My Bag',
    CHECKOUT: 'checkout',
    PURCHASE: 'place an order',
    REMOVE_ITEM: 'Remove Item',
    SEE_ORDERS: 'See your orders',
    SUBTOTAL: 'subtotal',
    THANK_CUSTOMER_f: (vendorName: string) =>
      `Thank you for shopping with ${vendorName}!`,
    UPDATE_CART: 'Update Bag',
  },

  social: {
    FRIENDS_LIST_TITLE: 'Your friends',
  },

  char: {
    NBSP: '\xa0',
  },
});

export default TextContent;
