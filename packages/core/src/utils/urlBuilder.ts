const shop = process.env.NEXT_PUBLIC_SHOP_APP_URL;
const dashboard = process.env.NEXT_PUBLIC_DASHBOARD_APP_URL;
const mainUrl = process.env.NEXT_PUBLIC_SERVER_MAIN_URL;
const paymentUrl = process.env.NEXT_PUBLIC_SERVER_PAYMENTS_URL;
const imageUrl = process.env.NEXT_PUBLIC_SERVER_IMAGE_URL;
const dispatchUrl = process.env.NEXT_PUBLIC_SERVER_DISPATCH_URL;
const smsUrl = process.env.NEXT_PUBLIC_SERVER_SMS_URL;

const urlBuilder = {
	shop,

	dashboard,
	dashboardDispensarySignUpUrl: `${dashboard}/signup/create-dispensary-account}`,

	main: {
		baseUrl: mainUrl + '/api/v1',

		getOTP: () => urlBuilder.main.baseUrl + '/signinup/code',
		submitOTP: () => urlBuilder.main.baseUrl + '/signinup/code/consume',

		healthCheck: () => urlBuilder.main.baseUrl + '/healthcheck',

		session: () => urlBuilder.main.baseUrl + '/session',

		ordersByOrgId: (id: any) =>
			urlBuilder.main.baseUrl + `/shop/orders/org/${id}`,
		ordersByUser: (id: any) => urlBuilder.main.baseUrl + `/user/${id}/orders`,
		orderById: (id: any) => urlBuilder.main.baseUrl + `/shop/orders/${id}`,
		orders: () => urlBuilder.main.baseUrl + `/shop/orders`,
		fulfillOrder: () => urlBuilder.main.baseUrl + `/shop/orders-fulfill`,

		productsByOrgId: (id: any) =>
			urlBuilder.main.baseUrl + `/shop/products/org/${id}`,
		productById: (id: any) => urlBuilder.main.baseUrl + `/shop/products/${id}`,
		products: () => urlBuilder.main.baseUrl + '/shop/products',
		productUpdate: (id: any) =>
			urlBuilder.main.baseUrl + `/organization/product/${id}/update`,
		productsByMultipleOrgs: (page: number, limit: number) =>
			urlBuilder.main.baseUrl + `/shop/products&_page=${page}&_limit=${limit}`,

		organization: () => urlBuilder.main.baseUrl + `/organization`,
		organizationById: (id: any) =>
			urlBuilder.main.baseUrl + `/organization/${id}`,
		organizationWithDashboardDetails: (id: any) =>
			urlBuilder.main.baseUrl + `/organization/dashboard/${id}`,
		organizationsByZipCode: (zipcode: number, limit = 5, radius = 10000) =>
			urlBuilder.main.baseUrl +
			`/organization/zipcode=${zipcode}&limit=${limit}&radius=${radius}`,

		categoryList: (id: any) =>
			urlBuilder.main.baseUrl + `/organization/${id}/categories`,

		user: () => urlBuilder.main.baseUrl + `/user`,
		staff: () => urlBuilder.main.baseUrl + `/user/staff`,
		userById: (id: any) => urlBuilder.main.baseUrl + `/user/${id}`,
		usersByOrg: (id: any) =>
			urlBuilder.main.baseUrl + `/organization/${id}/users`,

		address: () => urlBuilder.main.baseUrl + '/user/address',
		addressByIdAndUser: (addressId: any, id: any) =>
			urlBuilder.main.baseUrl + `/auth/user/${id}/address/${addressId}`,

		driverById: (id: any) => urlBuilder.main.baseUrl + `/driver/${id}`,
		driverUpdateStatus: () => urlBuilder.main.baseUrl + `/driver/status`,

		blog: () => urlBuilder.main.baseUrl + `/blog`,
		blogById: (id: string) => urlBuilder.main.baseUrl + `/blog/${id}`,

		organizationsLocal: () =>
			urlBuilder.main.baseUrl + '/serve-local/organizations',
		organizationLocationRecord: () =>
			urlBuilder.main.baseUrl + '/serve-local/organizations/record',
		getOrganizationRecord: (id: string) =>
			urlBuilder.main.baseUrl + `/serve-local/organizations/${id}`,
	},

	payment: {
		baseUrl: paymentUrl + '/api/v1',
		// purchase: () => urlBuilder.payment.baseUrl + '/payment/purchase',

		getStripeAccount: () => urlBuilder.payment.baseUrl + '/account',

		createStripeDispensaryAccount: () =>
			urlBuilder.payment.baseUrl + `/account/create-dispensary`,
		connectStripeDispensaryAccount: () =>
			urlBuilder.payment.baseUrl + `/account/connect-dispensary`,
		checkOnboard: () =>
			urlBuilder.payment.baseUrl + '/account/check-onboard-dispensary',

		createStripeDeliveryDriverAccount: () =>
			urlBuilder.payment.baseUrl + `/account/create-driver`,
		createCustomer: () =>
			urlBuilder.payment.baseUrl + '/account/create-customer',

		setupSubscriptionDispensary: () =>
			urlBuilder.payment.baseUrl + '/payment/subscribe-dispensary',
		checkout: () => urlBuilder.payment.baseUrl + '/payment/checkout',
		saveCustomerPaymentMethod: () =>
			urlBuilder.payment.baseUrl + '/payment/save-payment',
		chargeCustomer: () =>
			urlBuilder.payment.baseUrl + '/payment/charge-customer',
	},

	image: {
		baseUrl: imageUrl + '/api/v1',
		verifyIdentificationImageUpload: () =>
			urlBuilder.image.baseUrl + '/image/scan-identification-upload',
		verifyIdentificationImageUri: () =>
			urlBuilder.image.baseUrl + '/image/scan-identification-uri',
	},

	dispatch: {
		// baseUrl: dispatchUrl + '/api/v1',
		// newOrder: () => urlBuilder.dispatch.baseUrl + '/dispatch/order/new',
		// connect: () => urlBuilder.dispatch.baseUrl + '/dispatch/connect',
		connect: () => `${dispatchUrl}`,
	},

	smsServer: {
		baseUrl: smsUrl + '/api/v1',
		dailyDealById: (id: string) =>
			urlBuilder.smsServer.baseUrl + `/sms/daily-deals/${id}`,
		dailyDealsByOrganization: (id: string) =>
			urlBuilder.smsServer.baseUrl + `/sms/daily-deals/organization/${id}`,
		dailyDeal: () => urlBuilder.smsServer.baseUrl + `/sms/daily-deals`,
		dailyDealSmsResponse: () =>
			urlBuilder.smsServer.baseUrl + `/sms/daily-deal-sms-response`,
	},

	dailyStory: {
		baseUrl: process.env.NEXT_PUBLIC_DAILYSTORY_API_URL,
		createContact: () => `${urlBuilder.dailyStory.baseUrl}/api/v1/contact/`,
		addTagsToContact: (id: string) =>
			urlBuilder.dailyStory.baseUrl + `/api/v2/contact/${id}/tags`,

		sendEmail: ({
			id,
			email = null,
			dsid = null,
		}: {
			id: string;
			email?: string | null;
			dsid?: string | null;
		}) =>
			urlBuilder.dailyStory.baseUrl +
			`/api/v1/email/send/${id}?dsid=${dsid}&email=${email}`,

		sendTransactionalEmail: ({
			email = null,
			dsid = null,
		}: {
			email?: string | null;
			dsid?: string | null;
		}) =>
			urlBuilder.dailyStory.baseUrl +
			`/api/v1/email/transactional/?dsid=${dsid}&email=${email}`,
		createOrEditLead: () => urlBuilder.dailyStory.baseUrl + `/api/v1/lead/`,
	},

	slickText: {
		baseUrl: process.env.NEXT_PUBLIC_SLICKTEXT_API_URL,
	},

	freshSales: {
		baseUrl: process.env.FRESHSALES_API_URL,
		createContact: () => `${urlBuilder.freshSales.baseUrl}/api/contacts`,
		upsertContact: () => `${urlBuilder.freshSales.baseUrl}/api/contacts/upsert`,
		marketingList: () => `${urlBuilder.freshSales.baseUrl}/api/lists`,
		getContactViews: () =>
			`${urlBuilder.freshSales.baseUrl}/api/contacts/filters`,
		getContactsFromView: (id: string) =>
			`${urlBuilder.freshSales.baseUrl}/api/contacts/view/${id}`,
		getContactsFromList: (id: string) =>
			`${urlBuilder.freshSales.baseUrl}/api/contacts/lists/${id}`,
		addContactsToList: (id: string) =>
			`${urlBuilder.freshSales.baseUrl}/api/lists/${id}/add_contacts`,
		removeContactsFromList: (id: string) =>
			`${urlBuilder.freshSales.baseUrl}/api/lists/${id}/remove_contacts`,

		createAccount: () => `${urlBuilder.freshSales.baseUrl}/api/sales_accounts`,
		upsertAccount: () =>
			`${urlBuilder.freshSales.baseUrl}/api/sales_accounts/upsert`,
	},

	locationIq: {
		search: (q: string, limit = 1) =>
			`https://us1.locationiq.com/v1/search?q=${q}&format=json&addressdetails=1&limit=${limit}&normalizeaddress=1&normalizecity=1&postaladdress=1&dedupe=1&key=${process.env.NEXT_PUBLIC_LOCATION_IQ_API_KEY}`,
		autocomplete: (q: string, limit = 10) =>
			`https://us1.locationiq.com/v1/autocomplete?key=${process.env.NEXT_PUBLIC_LOCATION_IQ_API_KEY}&q=${q}&limit=${limit}`,
		city: (city: string, limit = 10) =>
			`https://us1.locationiq.com/v1/search/structured?city=${city}&limit=${limit}&key=${process.env.NEXT_PUBLIC_LOCATION_IQ_API_KEY}&format=json`,
	},
};

export { urlBuilder };
