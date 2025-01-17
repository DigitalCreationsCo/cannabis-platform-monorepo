import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const booleanSchema = z
  .string()
  .default("false")
  .transform((val) => ["true", "1", "yes"].includes(val.toLowerCase()));

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NEXTAUTH_SECRET: z.string(),
    NEXTAUTH_SESSION_STRATEGY: z.enum(["jwt", "database"]).default("jwt"),
    
    SMTP_HOST: z.string().optional(),
    SMTP_PORT: z.coerce.number().optional(),
    SMTP_USER: z.string().optional(),
    SMTP_PASSWORD: z.string().optional(),
    SMTP_FROM: z.string().email().optional(),
    
    GITHUB_CLIENT_ID: z.string().optional(),
    GITHUB_CLIENT_SECRET: z.string().optional(),
    GOOGLE_CLIENT_ID: z.string().optional(),
    GOOGLE_CLIENT_SECRET: z.string().optional(),
    
    RETRACED_URL: z.string().optional(),
    RETRACED_API_KEY: z.string().optional(),
    RETRACED_PROJECT_ID: z.string().optional(),
    
    GROUP_PREFIX: z.string().optional(),
    
    JACKSON_URL: z.string().url().optional(),
    JACKSON_API_KEY: z.string().optional(),
    JACKSON_PRODUCT_ID: z.string().default("gras"),
    JACKSON_WEBHOOK_SECRET: z.string().optional(),
    
    CONFIRM_EMAIL: booleanSchema,
    
    DISABLE_NON_BUSINESS_EMAIL_SIGNUP: booleanSchema,
    
    AUTH_PROVIDERS: z.string().default("credentials"),
    
    OTEL_PREFIX: z.string().default("gras"),
    
    HIDE_LANDING_PAGE: booleanSchema,
    
    FEATURE_TEAM_SSO: booleanSchema,
    FEATURE_TEAM_DSYNC: booleanSchema,
    FEATURE_TEAM_WEBHOOK: booleanSchema,
    FEATURE_TEAM_API_KEY: booleanSchema,
    FEATURE_TEAM_AUDIT_LOG: booleanSchema,
    FEATURE_TEAM_PAYMENTS: booleanSchema,
    FEATURE_TEAM_DELETION: booleanSchema,
    
    MAX_LOGIN_ATTEMPTS: z.coerce.number().default(5),
    
    STRIPE_API_KEY_SECRET: z.string(),
    STRIPE_WEBHOOK_SECRET: z.string(),
    STRIPE_API_VERSION: z.string().default("2024-06-20"),
   
    SANITY_API_DRAFT_TOKEN: z.string(),
    SANITY_API_EDITOR_TOKEN: z.string(),
    
    BACKEND_URL: z.string().url(),

    STRIPE_PLATFORM_ID: z.string(),
    
    SUPERTOKENS_CONNECTION_URI: z.string().url().optional(),
    SUPERTOKENS_CORE_API_KEY: z.string().optional(),
    SUPERTOKENS_SMS_API_KEY: z.string().optional(),
    SUPERTOKENS_DASHBOARD_KEY: z.string().optional(),
    
    PASSWORD_RESET_EXPIRY_MINS: z.coerce.number().default(15),
    PASSWORD_SALT_ROUNDS: z.coerce.number().default(12),
    SUPERTOKENS_DEBUG: booleanSchema,
    
    DATABASE_ENV: z.enum(["production", "development"]).default("development"),
    POOLING_DATABASE_URL: z.string().optional(),
    SHADOW_DATABASE_URL: z.string().optional(),
    
    ORGANIZATION_IMAGES_BUCKET: z.string(),
    ID_VERIFY_BUCKET: z.string(),
    OBJECT_STORAGE_REGION: z.string(),
    OBJECT_STORAGE_ENDPOINT: z.string().url(),
    STORAGE_ACCESS_KEY: z.string(),
    STORAGE_SECRET_KEY: z.string(),
    
    REKOGNITION_ACCESS_KEY: z.string(),
    REKOGNITION_SECRET_KEY: z.string(),
    
    REDIS_TRANSFER_CART: z.string(),
    REDIS_TRANSFER_CART_PORT: z.coerce.number(),
    REDIS_TRANSFER_CART_PASSWORD: z.string(),
    
    TWILIO_ACCOUNT_SID: z.string(),
    TWILIO_AUTH_TOKEN: z.string(),
    TWILIO_DAILY_DEALS_SERVICE_URL: z.string().url(),
    TWILIO_DAILY_DEALS_SERVICE_SID: z.string(),

    DAILYSTORY_API_KEY: z.string(),
    
    TEXTGRID_BASE_URL: z.string().url(),
    TEXTGRID_ACCOUNT_SID: z.string(),
    TEXTGRID_AUTHTOKEN: z.string(),
    
    TELNYX_API_KEY: z.string(),
    TELNYX_PUBLIC_KEY: z.string(),
    
    MAKE_GENERATE_SOCIAL_POST_WEBHOOK: z.string().url(),
    MAKE_GENERATE_NEWSLETTER_WEBHOOK: z.string().url(),
    
    BREVO_API_KEY: z.string(),
    
    UNSPLASH_URL: z.string().url(),
    UNSPLASH_ACCESS_KEY: z.string(),
    UNSPLASH_SECRET_KEY: z.string(),
    
    OPENAI_API_KEY: z.string(),
    
    FRESHSALES_API_URL: z.string().url(),
    FRESHSALES_API_KEY: z.string(),
    
    CRON_API_KEY: z.string(),
    
    NEW_RELIC_APP_NAME: z.string(),
    NEW_RELIC_LICENSE_KEY: z.string(),
  },
  client: {
	NEXT_PUBLIC_SHOP_APP_URL: z.string().url(),
	NEXT_PUBLIC_SHOP_APP_CHECKOUT_SUCCESS_URL: z.string().url(),
    NEXT_PUBLIC_SUPPORT_EMAIL: z.string().email(),
    NEXT_PUBLIC_SUPPORT_PHONE: z.string(),

	NEXT_PUBLIC_MIXPANEL_TOKEN: z.string(),

    NEXT_PUBLIC_SANITY_API_VERSION: z.string().default("2023-06-21"),
	
    NEXT_PUBLIC_IS_LOCAL_BUILD: booleanSchema,
    NEXT_PUBLIC_DOMAIN: z.string().optional(),
    
    NEXT_PUBLIC_DELIVERY_TIME: z.coerce.number().default(2),
    NEXT_PUBLIC_PLATFORM_FEE: z.coerce.number().default(0.14),
    NEXT_PUBLIC_DELIVERY_FEE: z.coerce.number().default(0.08),
    NEXT_PUBLIC_LOW_DELIVERY_FEE: z.coerce.number().default(0.06),
    NEXT_PUBLIC_HIGH_DELIVERY_FEE: z.coerce.number().default(0.08),
    NEXT_PUBLIC_MILEAGE_RATE: z.coerce.number().default(0.36),
    
    NEXT_PUBLIC_BREVO_CONVERSATIONS_ID: z.string(),
    
    NEXT_PUBLIC_CANNABIS_INSIDER_PUBLICATION_ID: z.string(),
    NEXT_PUBLIC_SHOP_NEWSLETTER_SUBSCRIBE_API_KEY: z.string(),
    NEXT_PUBLIC_DISPENSARY_NEWSLETTER_SUBSCRIBE_API_KEY: z.string(),
    
    NEXT_PUBLIC_MAPBOX_API_KEY: z.string(),
    NEXT_PUBLIC_MAPS_EMBED_API_KEY: z.string(),
    NEXT_PUBLIC_MAPS_API_KEY_DRIVE_PWA: z.string(),
    
    NEXT_PUBLIC_DASHBOARD_APP_URL: z.string().url(),
    NEXT_PUBLIC_HELP_APP_URL: z.string().url(),
    NEXT_PUBLIC_BLOG_APP_URL: z.string().url(),
    
    NEXT_PUBLIC_SANITY_DATASET: z.string(),
    NEXT_PUBLIC_SANITY_PROJECT_ID: z.string(),

    NEXT_PUBLIC_SERVER_MAIN_URL: z.string().url(),
    NEXT_PUBLIC_SERVER_PAYMENTS_URL: z.string().url(),
    NEXT_PUBLIC_SERVER_IMAGE_URL: z.string().url(),
    NEXT_PUBLIC_SERVER_DISPATCH_URL: z.string().url(),
    NEXT_PUBLIC_SERVER_SMS_URL: z.string().url(),
    
    NEXT_PUBLIC_STRIPE_API_KEY: z.string(),
	NEXT_PUBLIC_CRYPTO_SK: z.string(),
    
    NEXT_PUBLIC_LOCATION_IQ_API_KEY: z.string(),
    NEXT_PUBLIC_LOCATION_IQ_GEOCODE_URL: z.string().url(),
    NEXT_PUBLIC_LOCATION_IQ_REVERSE_GEOCODE_URL: z.string().url(),
    NEXT_PUBLIC_LOCATION_IQ_ROUTING_URL: z.string().url(),
	
	NEXT_PUBLIC_DATABASE_URL: z.string().url(),
    NEXT_PUBLIC_GRAS_DB_NS: z.string(),

	NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string(),
    NEXT_PUBLIC_RECAPTCHA_SECRET_KEY: z.string(),
	
    NEXT_PUBLIC_SLICKTEXT_PUBLIC_KEY: z.string(),
    NEXT_PUBLIC_SLICKTEXT_PRIVATE_KEY: z.string(),
    NEXT_PUBLIC_SLICKTEXT_API_URL: z.string().url(),
    
    NEXT_PUBLIC_DAILYSTORY_API_URL: z.string().url(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_SESSION_STRATEGY: process.env.NEXTAUTH_SESSION_STRATEGY,

    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    SMTP_FROM: process.env.SMTP_FROM,

    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

    RETRACED_URL: process.env.RETRACED_URL,
    RETRACED_API_KEY: process.env.RETRACED_API_KEY,
    RETRACED_PROJECT_ID: process.env.RETRACED_PROJECT_ID,

    GROUP_PREFIX: process.env.GROUP_PREFIX,

    JACKSON_URL: process.env.JACKSON_URL,
    JACKSON_API_KEY: process.env.JACKSON_API_KEY,
    JACKSON_PRODUCT_ID: process.env.JACKSON_PRODUCT_ID,
    JACKSON_WEBHOOK_SECRET: process.env.JACKSON_WEBHOOK_SECRET,

    CONFIRM_EMAIL: process.env.CONFIRM_EMAIL,

    DISABLE_NON_BUSINESS_EMAIL_SIGNUP: process.env.DISABLE_NON_BUSINESS_EMAIL_SIGNUP,

    AUTH_PROVIDERS: process.env.AUTH_PROVIDERS,

    OTEL_PREFIX: process.env.OTEL_PREFIX,

    HIDE_LANDING_PAGE: process.env.HIDE_LANDING_PAGE,

    FEATURE_TEAM_SSO: process.env.FEATURE_TEAM_SSO,
    FEATURE_TEAM_DSYNC: process.env.FEATURE_TEAM_DSYNC,
    FEATURE_TEAM_WEBHOOK: process.env.FEATURE_TEAM_WEBHOOK,
    FEATURE_TEAM_API_KEY: process.env.FEATURE_TEAM_API_KEY,
    FEATURE_TEAM_AUDIT_LOG: process.env.FEATURE_TEAM_AUDIT_LOG,
    FEATURE_TEAM_PAYMENTS: process.env.FEATURE_TEAM_PAYMENTS,
    FEATURE_TEAM_DELETION: process.env.FEATURE_TEAM_DELETION,

    MAX_LOGIN_ATTEMPTS: process.env.MAX_LOGIN_ATTEMPTS,

    STRIPE_API_KEY_SECRET: process.env.STRIPE_API_KEY_SECRET,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    STRIPE_API_VERSION: process.env.STRIPE_API_VERSION,

    SANITY_API_DRAFT_TOKEN: process.env.SANITY_API_DRAFT_TOKEN,
    SANITY_API_EDITOR_TOKEN: process.env.SANITY_API_EDITOR_TOKEN,

    BACKEND_URL: process.env.BACKEND_URL,

    STRIPE_PLATFORM_ID: process.env.STRIPE_PLATFORM_ID,

    SUPERTOKENS_CONNECTION_URI: process.env.SUPERTOKENS_CONNECTION_URI,
    SUPERTOKENS_CORE_API_KEY: process.env.SUPERTOKENS_CORE_API_KEY,
    SUPERTOKENS_SMS_API_KEY: process.env.SUPERTOKENS_SMS_API_KEY,
    SUPERTOKENS_DASHBOARD_KEY: process.env.SUPERTOKENS_DASHBOARD_KEY,

    PASSWORD_RESET_EXPIRY_MINS: process.env.PASSWORD_RESET_EXPIRY_MINS,
    PASSWORD_SALT_ROUNDS: process.env.PASSWORD_SALT_ROUNDS,
    SUPERTOKENS_DEBUG: process.env.SUPERTOKENS_DEBUG,

    DATABASE_ENV: process.env.DATABASE_ENV,
    POOLING_DATABASE_URL: process.env.POOLING_DATABASE_URL,
    SHADOW_DATABASE_URL: process.env.SHADOW_DATABASE_URL,

    ORGANIZATION_IMAGES_BUCKET: process.env.ORGANIZATION_IMAGES_BUCKET,
    ID_VERIFY_BUCKET: process.env.ID_VERIFY_BUCKET,
    OBJECT_STORAGE_REGION: process.env.OBJECT_STORAGE_REGION,
    OBJECT_STORAGE_ENDPOINT: process.env.OBJECT_STORAGE_ENDPOINT,
    STORAGE_ACCESS_KEY: process.env.STORAGE_ACCESS_KEY,
    STORAGE_SECRET_KEY: process.env.STORAGE_SECRET_KEY,

    REKOGNITION_ACCESS_KEY: process.env.REKOGNITION_ACCESS_KEY,
    REKOGNITION_SECRET_KEY: process.env.REKOGNITION_SECRET_KEY,

    REDIS_TRANSFER_CART: process.env.REDIS_TRANSFER_CART,
    REDIS_TRANSFER_CART_PORT: process.env.REDIS_TRANSFER_CART_PORT,
    REDIS_TRANSFER_CART_PASSWORD: process.env.REDIS_TRANSFER_CART_PASSWORD,

    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_DAILY_DEALS_SERVICE_URL: process.env.TWILIO_DAILY_DEALS_SERVICE_URL,
    TWILIO_DAILY_DEALS_SERVICE_SID: process.env.TWILIO_DAILY_DEALS_SERVICE_SID,

    DAILYSTORY_API_KEY: process.env.DAILYSTORY_API_KEY,

    TEXTGRID_BASE_URL: process.env.TEXTGRID_BASE_URL,
    TEXTGRID_ACCOUNT_SID: process.env.TEXTGRID_ACCOUNT_SID,
    TEXTGRID_AUTHTOKEN: process.env.TEXTGRID_AUTHTOKEN,

    TELNYX_API_KEY: process.env.TELNYX_API_KEY,
    TELNYX_PUBLIC_KEY: process.env.TELNYX_PUBLIC_KEY,

    MAKE_GENERATE_SOCIAL_POST_WEBHOOK: process.env.MAKE_GENERATE_SOCIAL_POST_WEBHOOK,
    MAKE_GENERATE_NEWSLETTER_WEBHOOK: process.env.MAKE_GENERATE_NEWSLETTER_WEBHOOK,

    BREVO_API_KEY: process.env.BREVO_API_KEY,

    UNSPLASH_URL: process.env.UNSPLASH_URL,
    UNSPLASH_ACCESS_KEY: process.env.UNSPLASH_ACCESS_KEY,
    UNSPLASH_SECRET_KEY: process.env.UNSPLASH_SECRET_KEY,

    OPENAI_API_KEY: process.env.OPENAI_API_KEY,

    FRESHSALES_API_URL: process.env.FRESHSALES_API_URL,
    FRESHSALES_API_KEY: process.env.FRESHSALES_API_KEY,

    CRON_API_KEY: process.env.CRON_API_KEY,

    NEW_RELIC_APP_NAME: process.env.NEW_RELIC_APP_NAME,
    NEW_RELIC_LICENSE_KEY: process.env.NEW_RELIC_LICENSE_KEY,

    NEXT_PUBLIC_SHOP_APP_URL: process.env.NEXT_PUBLIC_SHOP_APP_URL,
    NEXT_PUBLIC_SHOP_APP_CHECKOUT_SUCCESS_URL: process.env.NEXT_PUBLIC_SHOP_APP_CHECKOUT_SUCCESS_URL,
    NEXT_PUBLIC_SUPPORT_EMAIL: process.env.NEXT_PUBLIC_SUPPORT_EMAIL,
    NEXT_PUBLIC_SUPPORT_PHONE: process.env.NEXT_PUBLIC_SUPPORT_PHONE,

    NEXT_PUBLIC_MIXPANEL_TOKEN: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN,

    NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,

    NEXT_PUBLIC_IS_LOCAL_BUILD: process.env.NEXT_PUBLIC_IS_LOCAL_BUILD,
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,

    NEXT_PUBLIC_DELIVERY_TIME: process.env.NEXT_PUBLIC_DELIVERY_TIME,
    NEXT_PUBLIC_PLATFORM_FEE: process.env.NEXT_PUBLIC_PLATFORM_FEE,
    NEXT_PUBLIC_DELIVERY_FEE: process.env.NEXT_PUBLIC_DELIVERY_FEE,
    NEXT_PUBLIC_LOW_DELIVERY_FEE: process.env.NEXT_PUBLIC_LOW_DELIVERY_FEE,
    NEXT_PUBLIC_HIGH_DELIVERY_FEE: process.env.NEXT_PUBLIC_HIGH_DELIVERY_FEE,
    NEXT_PUBLIC_MILEAGE_RATE: process.env.NEXT_PUBLIC_MILEAGE_RATE,

    NEXT_PUBLIC_BREVO_CONVERSATIONS_ID: process.env.NEXT_PUBLIC_BREVO_CONVERSATIONS_ID,

    NEXT_PUBLIC_CANNABIS_INSIDER_PUBLICATION_ID: process.env.NEXT_PUBLIC_CANNABIS_INSIDER_PUBLICATION_ID,
    NEXT_PUBLIC_SHOP_NEWSLETTER_SUBSCRIBE_API_KEY: process.env.NEXT_PUBLIC_SHOP_NEWSLETTER_SUBSCRIBE_API_KEY,
    NEXT_PUBLIC_DISPENSARY_NEWSLETTER_SUBSCRIBE_API_KEY: process.env.NEXT_PUBLIC_DISPENSARY_NEWSLETTER_SUBSCRIBE_API_KEY,

    NEXT_PUBLIC_MAPBOX_API_KEY: process.env.NEXT_PUBLIC_MAPBOX_API_KEY,
    NEXT_PUBLIC_MAPS_EMBED_API_KEY: process.env.NEXT_PUBLIC_MAPS_EMBED_API_KEY,
    NEXT_PUBLIC_MAPS_API_KEY_DRIVE_PWA: process.env.NEXT_PUBLIC_MAPS_API_KEY_DRIVE_PWA,

    NEXT_PUBLIC_DASHBOARD_APP_URL: process.env.NEXT_PUBLIC_DASHBOARD_APP_URL,
    NEXT_PUBLIC_HELP_APP_URL: process.env.NEXT_PUBLIC_HELP_APP_URL,
    NEXT_PUBLIC_BLOG_APP_URL: process.env.NEXT_PUBLIC_BLOG_APP_URL,

    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,

    NEXT_PUBLIC_SERVER_MAIN_URL: process.env.NEXT_PUBLIC_SERVER_MAIN_URL,
    NEXT_PUBLIC_SERVER_PAYMENTS_URL: process.env.NEXT_PUBLIC_SERVER_PAYMENTS_URL,
    NEXT_PUBLIC_SERVER_IMAGE_URL: process.env.NEXT_PUBLIC_SERVER_IMAGE_URL,
    NEXT_PUBLIC_SERVER_DISPATCH_URL: process.env.NEXT_PUBLIC_SERVER_DISPATCH_URL,
    NEXT_PUBLIC_SERVER_SMS_URL: process.env.NEXT_PUBLIC_SERVER_SMS_URL,

    NEXT_PUBLIC_STRIPE_API_KEY: process.env.NEXT_PUBLIC_STRIPE_API_KEY,
    NEXT_PUBLIC_CRYPTO_SK: process.env.NEXT_PUBLIC_CRYPTO_SK,

    NEXT_PUBLIC_LOCATION_IQ_API_KEY: process.env.NEXT_PUBLIC_LOCATION_IQ_API_KEY,
    NEXT_PUBLIC_LOCATION_IQ_GEOCODE_URL: process.env.NEXT_PUBLIC_LOCATION_IQ_GEOCODE_URL,
    NEXT_PUBLIC_LOCATION_IQ_REVERSE_GEOCODE_URL: process.env.NEXT_PUBLIC_LOCATION_IQ_REVERSE_GEOCODE_URL,
    NEXT_PUBLIC_LOCATION_IQ_ROUTING_URL: process.env.NEXT_PUBLIC_LOCATION_IQ_ROUTING_URL,

    NEXT_PUBLIC_DATABASE_URL: process.env.NEXT_PUBLIC_DATABASE_URL,
    NEXT_PUBLIC_GRAS_DB_NS: process.env.NEXT_PUBLIC_GRAS_DB_NS,

    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
    NEXT_PUBLIC_RECAPTCHA_SECRET_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY,

    NEXT_PUBLIC_SLICKTEXT_PUBLIC_KEY: process.env.NEXT_PUBLIC_SLICKTEXT_PUBLIC_KEY,
    NEXT_PUBLIC_SLICKTEXT_PRIVATE_KEY: process.env.NEXT_PUBLIC_SLICKTEXT_PRIVATE_KEY,
    NEXT_PUBLIC_SLICKTEXT_API_URL: process.env.NEXT_PUBLIC_SLICKTEXT_API_URL,

    NEXT_PUBLIC_DAILYSTORY_API_URL: process.env.NEXT_PUBLIC_DAILYSTORY_API_URL,
  },
  skipValidation: process.env.SKIP_ENV_VALIDATION === 'true',
});


const vercelHost =
	process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
		? process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
		: process.env.NEXT_PUBLIC_VERCEL_URL;
const vercelUrl = vercelHost ? `https://${vercelHost}` : undefined;
const publicUrl = process.env.NEXT_PUBLIC_URL || vercelUrl;

if (!publicUrl) {
	throw new Error("Missing NEXT_PUBLIC_URL or NEXT_PUBLIC_VERCEL_URL variables!");
}

// force type inference to string
const _publicUrl = publicUrl;
export { _publicUrl as publicUrl };