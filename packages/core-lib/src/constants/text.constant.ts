import {
	type OrderWithDispatchDetails,
	type OrganizationWithAddress,
} from '@cd/data-access';
import { showTime } from '../utils/time.util';
import { renderAddress } from '../utils/ui.util';

/* eslint-disable @typescript-eslint/naming-convention */
const nbsp = '\xa0';
const copyrightsymbol = '&#169';

const TextContent = Object.freeze({
	prompt: {
		ACCEPT_ORDER: 'Do you want to accept the order?',
		CONFIRM_ADD_TO_CART: `Your bag contains an item from another shop.
    Do you want to empty the bag and add this item instead?`,
		CREATE_ACCOUNT: '',

		READY_CHECKOUT: `You're ready to checkout.`,
		REVIEW_CHECKOUT: `Tap Checkout to pay`,
		REVIEW_PLACE_ORDER: `Review your order. 
		When you're ready, tap Place my order.`,

		CREATE_DISPENSARY_ACCOUNT: 'Create a Dispensary account',
		CONTINUE: `When you're ready, click continue.`,
		FIND_DISPENSARY: 'Find a Dispensary',
		READ_REVIEWS: 'Read Reviews',

		FORM_FIELDS: 'Please fill out the required fields.',
		MAKE_CHANGES: `If you wish to make any changes, please press back.`,

		REVIEWS_CAPTION: "What's the word on this product?",
		SELECT_LOCATION_TYPE: 'Where can we deliver your next order?',
		TIP_CAPTION: 'You can leave a tip!',
		TIP_CUSTOM: 'How would you like to tip?',
		ENTER_PASSCODE: 'Enter your one time passcode',
		PASSCODE_SENT_f: (input: string) =>
			`A one time passcode is sent to ${input}`,
		FIRST_NAME_REQUIRED: 'first name is required',
		FIRST_NAME_MINIMUM_f: (val: number) =>
			`first name must be at least ${val} characters`,
		LAST_NAME_REQUIRED: 'last name is required',
		LAST_NAME_MINIMUM_f: (val: number) =>
			`last name must be at least ${val} characters`,
		USERNAME_REQUIRED: 'username is required',
		USERNAME_INVALID: 'username is invalid',
		USERNAME_MINIMUM_f: (val: number) =>
			`username must be at least ${val} characters`,
		EMAIL_REQUIRED: 'email is required',
		EMAIL_INVALID: 'email is invalid',
		DIALCODE_REQUIRED: 'dialing code is required',
		PHONE_REQUIRED: 'phone number is required',
		PHONE_MINIMUM_f: (val: number) => `phone number must be ${val} digits`,
		PROFILE_PICTURE_REQUIRED: 'select a profile picture',
		STREET1_REQUIRED: 'street line 1 is required',
		STREET2_REQUIRED: 'street line 2 is required',
		CITY_REQUIRED: 'city is required',
		STATE_REQUIRED: 'state is required',
		ZIPCODE_REQUIRED: 'zipcode is required',
		ZIPCODE_MINIMUM_f: (val: number) => `zipcode must be ${val} digits`,
		COUNTRY_REQUIRED: 'country is required',
		COUNTRYCODE_REQUIRED: 'country code is required',
		DISPENSARY_NAME_REQUIRED: 'Dispensary name is required',
		STRIPE_ID_REQUIRED: `Please enter your stripe ID`,
	},

	account: {
		ARE_YOU_A_DISPENSARY:
			'Are\xa0you\xa0a\xa0Dispensary? Get\xa0started\xa0here',
		ACCOUNT_IS_CREATED: 'Your account is created!',
		DISPENSARY_ACCOUNT_IS_CREATED:
			'You created your Dispensary Account with Gras',
		CHOOSE_PROFILE_PICTURE: 'Choose a profile picture.',
		CHOOSE_PROFILE_PICTURE_OR_UPLOAD:
			'Choose a profile picture, or upload your own.',
		CREATE_AN_ACCOUNT: 'Create an account',
		CREATE_YOUR_ACCOUNT: 'Create your account',

		FORGOT_YOUR_PASSWORD: 'Forgot your password?',

		CREATE_DISPENSARY_ACCOUNT: 'Create a Dispensary account',
		ABOUT_DISPENSARY_ADMIN_ACCOUNT: `Create an account to own and manage your dispensary's inventory, data, and other users. 
    This account will have the most access to your dispensary.`,
		NO_MEMBERSHIP_PERMISSION: `You don't have the permissions to sign in here. 
	Please visit grascannabis.org.`,
		DISPENSARY_JOINING: `Helping you serve the world of cannabis.`,

		DISPENSARIES_START_HERE: 'Dispensaries, get started here',
		DISPENSARY_STRIPE_ACCOUNT: `If your dispensary uses stripe for payments, you can connect your stripe account here, by entering your stripe ID. If you don't have a stripe account, Gras will create one for you.`,
		CONNECT_MY_STRIPE: `Connect my stripe account`,
		CONNECTING_TO_STRIPE: `connecting to stripe`,
		I_DONT_HAVE_STRIPE: `I don't have a stripe account`,
		ENTER_OR_GO_TO_ACCOUNT:
			'You can enter the Gras site, or view your account.',
		MY_ACCOUNT: 'My Account',
		MY_ORDERS: `My Orders`,

		REVIEW_ACCOUNT: `Please review your account information.`,
		VERIFY_ID_PROCESSING: 'Verifying your ID..',
		VERIFY_ID_COMPLETE: 'Thanks for verifying!',

		ONETIME_PASSCODE_SENT_EMAIL_f: (receipient: string) =>
			`A one time passcode has been sent to ${receipient}.`,
		ONETIME_PASSCODE_SENT_MOBILE_f: (receipient: string) =>
			`Your one time passcode has been sent to ${receipient}.`,

		SIGNING_IN: `Signing in`,
		SIGNOUT: 'Sign out',
		SIGNIN: 'Sign in',
		SIGNIN_EMAIL: 'Sign in with your email',
		SIGNIN_PHONE: 'Sign in with your phone',
		SIGNIN_EMAIL_OR_PHONE: 'Sign in with your email or phone',
		SIGNUP: 'Sign up',
		CTA: 'SIGN ME UP',
	},

	error: {
		DISPENSARY_NOT_FOUND: `Dispensary is not found.`,
		DISPENSARY_NOT_ACCEPTING_PAYMENTS: `This dispensary is not accepting delivery orders.`,
		DRIVER_NOT_FOUND: `Driver is not found.`,
		ORDER_NOT_FOUND: `Order is not found.`,
		INVALID_ORDER: `Invalid order.`,

		USER_EXISTS_ERROR: `This user exists already. Please choose a different username or email.`,

		PAYMENT_NOT_PROCESSED:
			'Your payment could not be processed. Please try again later. Thank you.',
		PAYMENT_SERVICE_NOT_AVAILABLE:
			'Payments are not available now. Please try again later. Thank you.',
		STRIPE_ACCOUNT_CREATE_FAILED:
			'The stripe account account creation failed. Please try again.',
		STRIPE_ACCOUNT_NOT_FOUND: `The stripe account is not found.`,

		PLEASE_TRY_AGAIN: 'Please try again. Thank you.',
		CONNECTION_ISSUE:
			"We're having trouble connecting you. Please try again. Thank you.",
		REQUEST_FAILED: `That didn't work.`,
		SERVER_NOT_AVAILABLE: `This service is not available. ${'\n'}Please try again later.`,
	},

	info: {
		ABOUT_GRAS: `Gras is a home-grown service company. `,
		ABOUT_GRAS_2: `Gras is a home-grown service-first company. We serve our communities by enabling communication and support between people and businesses.`,
		BUILDING_TRUST_WITH_OUR_PARTNERS: `Gras is building a trusted community of partners and cannabis lovers.`,
		CANNABIS_DELIVERED: `Cannabis,${'\xa0'}Delivered.${'\xa0'}🌴${'\xa0'}🔥`,
		CANNABIS_DELIVERED_TEXT: `Cannabis,${'\xa0'}Delivered.`,
		CANNABIS_DELIVERED_TODAY: `Cannabis,${'\xa0'}Delivered${'\xa0'}Today🌴`,
		COMPANY_NAME: 'Gras',
		CONTACT_SUPPORT: `For support, dial ${process.env.NEXT_PUBLIC_SUPPORT_PHONE}.`,

		DELIVERY_BY_GRAS: `Delivery by Gras`,
		EMAIL: 'Email',
		GET_CANNABIS_DELIVERED: `Get${nbsp}Cannabis${nbsp}Delivered`,
		GRAS_MISSION: `It's our mission to cultivate meaningful experiences with our customers and partners in the cannabis world, one${nbsp}delivery${nbsp}at${nbsp}a${nbsp}time.`,
		GRAS_MISSION_2: `Our mission is to cultivate fulfillment and meaningful experiences with our customers and partners in the cannabis world, one${nbsp}delivery${nbsp}at${nbsp}a${nbsp}time.`,
		LEARN_MORE: `Learn more`,
		MORE_CONTENT_COMING_SOON: `Our Team is bringing you more news and content from the world of cannabis.`,

		CANNABIS_MARKETPLACE: 'Cannabis Marketplace',
		CONNECT_WITH_WORLD_OF_CANNABIS: `connect with the world of cannabis`,
		ONE_STOP_MARKETPLACE: 'a one stop cannabis marketplace',
		SMS_FOOTER: `Reply STOP to unsubscribe. Msg&Data Rates May Apply.`,
		SMS_UPDATE: `Check your sms messages for updates on your order.`,
		THANK_YOU: `Thank you for choosing Gras.`,
		TIME_GUARANTEE: `We guarantee a delivery time of two hours`,

		ORDER_AT_CHECKOUT: `Place your order at checkout.`,
		PARTNER_FOR_DELIVERY_f: (organizationName?: string) =>
			`${
				organizationName || 'Your favorite Dispensary'
			} is partnering with Gras to offer you home delivery.`,
		FULL_SERVICE_CANNABIS_DELIVERY: `Easy & Secure \n Cannabis Delivery`,
		GRAS_WILL_DELIVER_STRAIGHT_TO_YOUR_DOOR:
			'Gras will deliver your order straight to your door.',
		GRAS_DELIVERS_FOR_DISPENSARIES:
			'Gras delivers for Medicinal and Recreational Dispensaries directly to customers.',
		YOUR_PEOPLE_ARE_OUR_PEOPLE: `Your people are our people.`,
		DELIVER_FOR_GRAS: 'Deliver for Gras',
	},

	blog: {
		BLOG: 'Gras-BLOG',
		DIRECTORY: 'Directory',
		EXPAND_YOUR_MIND: 'Expand your mind',
		READ_MORE: 'Read more',
	},

	ui: {
		ADD_TO_CART_f: (qty: number) => `Add ${qty} to Bag`,

		ADDRESS_BLOCK_f: (destination: any) =>
			`${destination.address.street1} ${destination.address.street2}\n${
				destination.address.city
			}, ${destination.address.state} ${
				destination.address.zipcode.split('-')[0]
			}`,

		FORM_FIELDS: 'Please fill out the required fields.',

		ITEMS: 'Items',
		LOADING: 'Loading...',
		SAVE_CHANGES: 'Save Changes',
		CONTINUE: 'continue',
		BACK: 'go back',

		HOME_LOCATION_IS_SET: "We'll send your next delivery to Home.",
		CURRENT_LOCATION_IS_SET:
			"Got it! We'll send your next delivery to your current spot.",
		GIFT_LOCATION_IS_SET: "We'll send your next delivery to your friend!",
	},

	technical: {
		SHOP_WEB_APP: '',
		ADMIN_APP: '',
		DRIVER_APP: '',
		CHECKOUT_WIDGET: '',
		MOBILE_APP: '',
	},

	legal: {
		COMPANY_NAME: 'Gras',
		COPYRIGHT: `© 2023`,
		COPYRIGHT_RIGHTS_RESERVED: 'Gras © 2023 All rights reserved.',
		I_AGREE_TO_THE_USER_TERMS: `I agree to the User Terms and Conditions`,
		I_AGREE_TO_THE_DISPENSARY_TERMS: `I agree to the Dispensary Terms and Conditions`,
		AGREE_TO_TERMS:
			'Before creating an account with Gras, please agree to our ',
		READ_USER_TERMS_OF_SERVICE:
			'Please read the Gras User Terms and Conditions policy.',
		USER_TERMS_OF_SERVICE: 'User Terms and Conditions',
		READ_DISPENSARY_TERMS_OF_SERVICE:
			'Please read the Gras Dispensary Terms and Conditions policy.',
		DISPENSARY_TERMS_OF_SERVICE: 'Dispensary Terms and Conditions',

		PRIVACY_POLICY: 'Privacy Policy',
		READ_PRIVACY_POLICY: 'Read our Privacy Policy.',
		ACCOUNT_INFORMATION_POLICY:
			'Gras will never share your account information with other parties.',
	},

	dispatch: {
		status: {
			START_DELIVERING: 'Go Online',
			STOP_DELIVERING: "You're Connected",
			ACCEPT_ORDER: `You accepted the delivery order!\nTravel to pickup the order.`,
			ALL_DELIVERY_ORDERS: 'Your Delivery Queue',
			CONNECTED: `Connected to the dispatch server.`,

			CUSTOMER_ORDER_f: (customerName: string) =>
				`${customerName} placed an order`,
			DELIVER_TO_CUSTOMER_f: (order: OrderWithDispatchDetails['order']) =>
				`Deliver to ${order.customer.username}, ${renderAddress({
					address: order.destinationAddress,
					lineBreak: false,
				})}`,
			DELIVERY_COMPLETE: 'Your order was delivered!',
			DELIVER_FOR_f: (user: string) => `Delivery for ${user}`,
			DRIVER_ADDED: 'A driver has started your delivery!',
			DRIVER_ADDED_NAME_f: (name: string) =>
				`Your order is being delivered by ${name}!`,
			DRIVER_ARRIVED_TO_VENDOR_f: (driverName: string) =>
				`${driverName} has arrived to the vendor!`,
			DRIVER_PICKUP_PRODUCT_f: (driverName: string) =>
				`${driverName} has picked up your product!`,
			DRIVER_ARRIVED_TO_CUSTOMER_f: (driverName: string) =>
				`${driverName} has arrived with your order!`,
			DRIVER_SEARCH: 'Searching for a driver...',
			ORDER_NUM_DELIVER_QUEUE_f: (numOrders: number) =>
				`${numOrders} ${numOrders > 1 ? 'deliveries' : 'delivery'} in queue`,
			ORDERED_FROM_VENDOR_f: (vendorName: string) =>
				`Ordered from ${vendorName}`,
			ORDERING_FROM_VENDOR_f: (vendorName: string) =>
				`Ordering from ${vendorName}`,
			DELIVERY_DEADLINE_f: (order: OrderWithDispatchDetails['order']) =>
				`Deliver order by ${showTime(order.deliveryDeadline)}`,
			NAVIGATE_DELIVERY: `Navigate to start delivering your order.`,
			NEW_ORDER: `New Order!`,
			NEW_ORDER_FROM_GRAS: `New Order from Gras!`,
			RECEIVED_NEW_ORDER: `You received a delivery order from Gras.`,
			PICKUP_ADDRESS_f: (organization: OrganizationWithAddress) =>
				`Pickup from ${organization.name}, ${renderAddress({
					address: organization.address,
					lineBreak: false,
				})}`,
			ORDER_ASSIGNED_TO_ANOTHER_DRIVER: `You didn't claim this order. Stay online to receive your next order.`,
			REPLY_TO_ACCEPT_ORDER: `Reply '1' to accept the delivery order.`,
		},

		error: {
			ROOM_NOT_FOUND: `Dispatch room not found.`,
		},
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
		BAG_TAGLINE_GET_WHAT_YOU_WANT: 'Get what you want',
		BAG_TAGLINE_CURE_WHAT_AILS_YOU: 'Cure What Ails You',
		BAG_TAGLINE_CURE_FILL_MY_BAG: 'fill my bag',
		BROWSE_DISPENSARY_f: (vendorName: string) => `Browse ${vendorName}`,
		CART_TITLE: 'My Bag',
		CHECKOUT: 'checkout',
		ORDER_INFO_HEADER: "Here's your order",

		PAYMENT_SUCCESSFUL:
			'Your order is placed and sent to your Gras DeliveryPerson',
		PURCHASE: 'place an order',
		PLACE_AN_ORDER: 'place an order',
		PLACE_AN_ORDER_DELIVERY: 'place an order for delivery',

		RECEIPT_TO_EMAIL_f: (email: string) =>
			`Your receipt has been sent to ${email}.`,
		REMOVE_ITEM: 'Remove Item',
		SEE_ORDERS: 'See your orders',
		SUBTOTAL: 'subtotal',
		THANK_CUSTOMER_f: (vendorName: string) =>
			`Thank you for choosing ${vendorName} and Gras.`,
		UPDATE_CART: 'Update Bag',
		YOUR_ORDER: 'Your order',
	},

	social: {
		FRIENDS_LIST_TITLE: 'Your friends',
	},

	href: {
		browse: '/browse',

		bag: '/mybag',
		blog: `${process.env.NEXT_PUBLIC_SHOP_APP_URL}/blog`,
		services: `${process.env.NEXT_PUBLIC_DASHBOARD_APP_URL}/signup`,
		storefront_f: (subdomain: string) =>
			`${process.env.NEXT_PUBLIC_SHOP_APP_URL}/browse/${subdomain}`,

		dashboard_f: (id: string) => `/${id}/dashboard`,
		orders_f: (id: string) => `/${id}/orders`,
		delivery_tracking_f: (id: string) => `/${id}/tracking`,
		products_f: (id: string) => `/${id}/products`,
		users_f: (id: string) => `/${id}/users`,
		settings: '/settings',
		settings_f: (id: string) => `/${id}/settings`,
		account_f: (id: string) => `/${id}/account`,
		site: `/site-settings`,
		site_f: (id: string) => `/${id}/settings/site-settings`,
		setup_widget_f: (id: string) => `/${id}/settings/setup-widget`,
		preview_fullscreen_widget: (id: string) =>
			`/${id}/settings/preview-fullscreen`,
		support: '/help/support',

		help: `/help`,
		about: '/help?topic=about-gras',
		compliance: `/help?topic=compliance`,
		faq: `/help?topic=faq`,
		install_guide: `/help?topic=install-guide`,
		dispensary_tos: `/help?topic=dispensary-terms-and-conditions`,
		user_tos: `/help?topic=user-terms-and-conditions`,
		privacy: `/help?topic=privacy-policy`,
		driver_tos: `/help?topic=driver-terms-and-conditions`,
	},
});

export default TextContent;

export const SMSTemplate = Object.freeze({
	driver: {
		delivery_info_f: (order: OrderWithDispatchDetails['order']) =>
			`${TextContent.dispatch.status.DELIVERY_DEADLINE_f(
				order,
			)}\n${TextContent.dispatch.status.PICKUP_ADDRESS_f(
				order.organization,
			)}\n${TextContent.dispatch.status.DELIVER_TO_CUSTOMER_f(order)}`,
		new_order_f: (order: OrderWithDispatchDetails['order']) =>
			TextContent.dispatch.status.NEW_ORDER_FROM_GRAS +
			'\n' +
			TextContent.dispatch.status.PICKUP_ADDRESS_f(order.organization) +
			'\n' +
			TextContent.dispatch.status.REPLY_TO_ACCEPT_ORDER,
	},
});

export const SocketMessageTemplate = Object.freeze({
	driver: {
		new_order_f: (order: OrderWithDispatchDetails['order']) =>
			TextContent.dispatch.status.NEW_ORDER +
			'\n' +
			TextContent.dispatch.status.PICKUP_ADDRESS_f(order.organization),
	},
});
