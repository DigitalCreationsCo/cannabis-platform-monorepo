const shop = process.env.NEXT_PUBLIC_SHOP_APP_URL;
const dashboard = process.env.NEXT_PUBLIC_DASHBOARD_APP_URL;
const mainUrl = process.env.NEXT_PUBLIC_SERVER_MAIN_URL;
const locationUrl = process.env.NEXT_PUBLIC_SERVER_LOCATION_URL;
const paymentUrl = process.env.NEXT_PUBLIC_SERVER_PAYMENTS_URL;
const imageUrl = process.env.NEXT_PUBLIC_SERVER_IMAGE_URL;
const dispatchUrl = process.env.NEXT_PUBLIC_SERVER_DISPATCH_URL;

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
	},

	location: {
		baseUrl: locationUrl + '/api/v1',
		organizationsLocal: () =>
			urlBuilder.location.baseUrl + '/serve-local/organizations',
		organizationLocationRecord: () =>
			urlBuilder.location.baseUrl + '/serve-local/organizations/record',
		getOrganizationRecord: (id: string) =>
			urlBuilder.location.baseUrl + `/serve-local/organizations/${id}`,
	},

	payment: {
		baseUrl: paymentUrl + '/api/v1',
		// purchase: () => urlBuilder.payment.baseUrl + '/payment/purchase',

		getStripeAccount: () => urlBuilder.payment.baseUrl + '/account',

		setupSubscriptionDispensary: () =>
			urlBuilder.payment.baseUrl + '/payment/subscribe-dispensary',
		createStripeDispensaryAccount: () =>
			urlBuilder.payment.baseUrl + `/account/create-dispensary`,
		connectStripeDispensaryAccount: () =>
			urlBuilder.payment.baseUrl + `/account/connect-dispensary`,
		checkOnboard: () =>
			urlBuilder.payment.baseUrl + '/account/check-onboard-dispensary',

		checkout: () => urlBuilder.payment.baseUrl + '/payment/checkout',
		saveCustomerPaymentMethod: () =>
			urlBuilder.payment.baseUrl + '/payment/save-payment',
		createCustomer: () =>
			urlBuilder.payment.baseUrl + '/account/create-customer',
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
};

export { urlBuilder };
