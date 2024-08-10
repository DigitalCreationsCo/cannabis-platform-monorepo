import type { SessionStrategy } from 'next-auth';

const env = {
	databaseUrl: `${process.env.DATABASE_URL}`,
	appUrl: `${process.env.NEXT_PUBLIC_SHOP_APP_URL}`,
	redirectIfAuthenticated: '/',

	// SMTP configuration for NextAuth
	smtp: {
		host: process.env.SMTP_HOST,
		port: Number(process.env.SMTP_PORT),
		user: process.env.SMTP_USER,
		password: process.env.SMTP_PASSWORD,
		from: process.env.SMTP_FROM,
	},

	// NextAuth configuration
	nextAuth: {
		secret: process.env.NEXTAUTH_SECRET,
		sessionStrategy: (process.env.NEXTAUTH_SESSION_STRATEGY ||
			'jwt') as SessionStrategy,
	},

	// Social login: Github
	github: {
		clientId: `${process.env.GITHUB_CLIENT_ID}`,
		clientSecret: `${process.env.GITHUB_CLIENT_SECRET}`,
	},

	// Social login: Google
	google: {
		clientId: `${process.env.GOOGLE_CLIENT_ID}`,
		clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
	},

	// Retraced configuration
	retraced: {
		url: process.env.RETRACED_URL
			? `${process.env.RETRACED_URL}/auditlog`
			: undefined,
		apiKey: process.env.RETRACED_API_KEY,
		projectId: process.env.RETRACED_PROJECT_ID,
	},

	groupPrefix: process.env.GROUP_PREFIX,

	// SAML Jackson configuration
	jackson: {
		url: process.env.JACKSON_URL,
		apiKey: process.env.JACKSON_API_KEY,
		productId: process.env.JACKSON_PRODUCT_ID || 'gras',
		selfHosted: process.env.JACKSON_URL !== undefined,
		sso: {
			callback: `${process.env.NEXT_PUBLIC_SHOP_APP_URL}`,
			issuer: 'https://grascannabis.org',
			path: '/api/oauth/saml',
			oidcPath: '/api/oauth/oidc',
			idpLoginPath: '/auth/idp-login',
		},
		dsync: {
			webhook_url: `${process.env.NEXT_PUBLIC_SHOP_APP_URL}/api/webhooks/dsync`,
			webhook_secret: process.env.JACKSON_WEBHOOK_SECRET,
		},
	},

	// Users will need to confirm their email before accessing the app feature
	confirmEmail: process.env.CONFIRM_EMAIL === 'true',

	// Mixpanel configuration
	mixpanel: {
		token: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN,
	},

	disableNonBusinessEmailSignup:
		process.env.DISABLE_NON_BUSINESS_EMAIL_SIGNUP === 'true',

	authProviders: process.env.AUTH_PROVIDERS || 'credentials',

	otel: {
		prefix: process.env.OTEL_PREFIX || 'gras',
	},

	hideLandingPage: process.env.HIDE_LANDING_PAGE === 'true',

	darkModeEnabled: process.env.NEXT_PUBLIC_DARK_MODE !== 'false',

	teamFeatures: {
		sso: process.env.FEATURE_TEAM_SSO !== 'false',
		dsync: process.env.FEATURE_TEAM_DSYNC !== 'false',
		webhook: process.env.FEATURE_TEAM_WEBHOOK !== 'false',
		apiKey: process.env.FEATURE_TEAM_API_KEY !== 'false',
		auditLog: process.env.FEATURE_TEAM_AUDIT_LOG !== 'false',
		payments:
			process.env.FEATURE_TEAM_PAYMENTS === 'false'
				? false
				: Boolean(
						process.env.STRIPE_API_KEY_SECRET &&
							process.env.STRIPE_WEBHOOK_SECRET
					),
		deleteTeam: process.env.FEATURE_TEAM_DELETION !== 'false',
	},

	recaptcha: {
		siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || null,
		secretKey: process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY || null,
	},

	maxLoginAttempts: Number(process.env.MAX_LOGIN_ATTEMPTS) || 5,

	stripe: {
		secretKey: process.env.STRIPE_API_KEY_SECRET,
		webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
		apiVersion: process.env.STRIPE_API_VERSION || '2024-06-20',
	},
};

export default env;
