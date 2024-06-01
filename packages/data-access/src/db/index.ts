export const db_namespace = {
	db: process.env.NEXT_PUBLIC_GRAS_DB_NS as string,
	collections: {
		customers: 'customers',
		daily_deals: 'daily_deals',
		dispensaries: 'dispensaries',
		drivers: 'drivers',
		events: 'events',
		orders: 'orders',
		staff: 'staff',
		users: 'users',
		sessions: 'sessions',
		accounts: 'accounts',
		zipcodes: 'zipcodes',
		subscriptions: 'subscriptions',
		passwordReset: 'passwordReset',
		services: 'services',
		prices: 'prices',
		verificationToken: 'verificationToken',
		apiKey: 'apiKey',
	},
};
