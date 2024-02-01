-- CreateEnum
CREATE TYPE "LicenseType" AS ENUM ('dispensary', 'delivery');

-- CreateEnum
CREATE TYPE "USState" AS ENUM ('ALABAMA', 'ALASKA', 'ARIZONA', 'ARKANSAS', 'CALIFORNIA', 'COLORADO', 'CONNECTICUT', 'DELAWARE', 'FLORIDA', 'GEORGIA', 'HAWAII', 'IDAHO', 'ILLINOIS', 'INDIANA', 'IOWA', 'KANSAS', 'KENTUCKY', 'LOUISIANA', 'MAINE', 'MARYLAND', 'MASSACHUSETTS', 'MICHIGAN', 'MINNESOTA', 'MISSISSIPPI', 'MISSOURI', 'MONTANA', 'NEBRASKA', 'NEVADA', 'NEW_HAMPSHIRE', 'NEW_JERSEY', 'NEW_MEXICO', 'NEW_YORK', 'NORTH_CAROLINA', 'NORTH_DAKOTA', 'OHIO', 'OKLAHOMA', 'OREGON', 'PENNSYLVANIA', 'RHODE_ISLAND', 'SOUTH_CAROLINA', 'SOUTH_DAKOTA', 'TENNESSEE', 'TEXAS', 'UTAH', 'VERMONT', 'VIRGINIA', 'WASHINGTON', 'WEST_VIRGINIA', 'WISCONSIN', 'WYOMING');

-- CreateEnum
CREATE TYPE "USStateAbbreviated" AS ENUM ('AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY');

-- CreateEnum
CREATE TYPE "Country" AS ENUM ('United States', 'Canada');

-- CreateEnum
CREATE TYPE "CountryCode" AS ENUM ('US', 'CN');

-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('delivery', 'pickup');

-- CreateEnum
CREATE TYPE "POS" AS ENUM ('none', 'dutchie', 'weedmaps', 'blaze');

-- CreateEnum
CREATE TYPE "Inventory" AS ENUM ('none', 'dutchie', 'weedmaps', 'blaze', 'metrc');

-- CreateEnum
CREATE TYPE "Day" AS ENUM ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('Pending', 'Processing', 'ReadyForPickup', 'ReadyForDelivery', 'OnDelivery', 'Delivered', 'Cancelled', 'Completed');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('Pending', 'Paid', 'Failed');

-- CreateEnum
CREATE TYPE "MembershipRole" AS ENUM ('1', '2', '3');

-- CreateEnum
CREATE TYPE "CurrencyName" AS ENUM ('USD');

-- CreateEnum
CREATE TYPE "Unit" AS ENUM ('g');

-- CreateEnum
CREATE TYPE "ArticleTag" AS ENUM ('dispensaries', 'drivers', 'events', 'entertainment', 'culture', 'art', 'sports', 'science', 'politics', 'business', 'health', 'food', 'gras');

-- CreateEnum
CREATE TYPE "FeatureBe" AS ENUM ('weed_text');

-- CreateEnum
CREATE TYPE "FeatureFe" AS ENUM ('daily_deals_sms', 'orders', 'products', 'users', 'delivery_tracking', 'storefront', 'checkout_widget');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "oauth_token_secret" TEXT,
    "oauth_token" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionHandle" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Compliance" (
    "id" TEXT NOT NULL,
    "state" "USStateAbbreviated" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Compliance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LicenseGuidelines" (
    "state" "USStateAbbreviated" NOT NULL,
    "licenseType" "LicenseType"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "TransportGuidelines" (
    "state" "USStateAbbreviated" NOT NULL,
    "transportWeightLimit" DOUBLE PRECISION NOT NULL,
    "transportStartTime" INTEGER NOT NULL,
    "transportEndTime" INTEGER NOT NULL,
    "transportLockedStorage" BOOLEAN NOT NULL,
    "transportManifest" BOOLEAN NOT NULL,
    "transportStaff" INTEGER NOT NULL,
    "medicalDelivery" BOOLEAN NOT NULL,
    "recreationalDelivery" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "SaleGuidelines" (
    "state" "USStateAbbreviated" NOT NULL,
    "medicalSales" BOOLEAN NOT NULL,
    "recreationalSales" BOOLEAN NOT NULL,
    "ageLimit" INTEGER NOT NULL,
    "thcLimit" INTEGER NOT NULL,
    "weightLimit" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "isLegalAge" BOOLEAN,
    "isSignUpComplete" BOOLEAN NOT NULL DEFAULT false,
    "termsAccepted" BOOLEAN NOT NULL DEFAULT false,
    "idVerified" BOOLEAN NOT NULL DEFAULT false,
    "scannedDOB" TIMESTAMP(3),
    "idFrontImage" TEXT,
    "idBackImage" TEXT,
    "dialCode" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isSubscribedForWeedText" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Driver" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "licenseNumber" TEXT,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "licensePlateNumber" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DriverSession" (
    "id" TEXT NOT NULL,
    "isOnline" BOOLEAN NOT NULL DEFAULT false,
    "isActiveDelivery" BOOLEAN NOT NULL DEFAULT false,
    "routeId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DriverSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Route" (
    "driverId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Vendor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "publicName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vendor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "street1" TEXT NOT NULL,
    "street2" TEXT,
    "city" TEXT NOT NULL,
    "state" "USStateAbbreviated" DEFAULT 'MD',
    "zipcode" INTEGER NOT NULL,
    "country" "Country" NOT NULL DEFAULT 'United States',
    "countryCode" "CountryCode" DEFAULT 'US',
    "coordinateId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImageOrganization" (
    "id" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "blurhash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ImageOrganization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImageProduct" (
    "id" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "variantId" TEXT NOT NULL,
    "blurhash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ImageProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImageUser" (
    "id" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "blurhash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ImageUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImageVendor" (
    "id" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "blurhash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ImageVendor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImageArticle" (
    "id" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "articleId" TEXT NOT NULL,
    "blurhash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ImageArticle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coordinates" (
    "id" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "radius" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Coordinates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Membership" (
    "id" TEXT NOT NULL,
    "role" "MembershipRole" NOT NULL,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "Membership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "type" "OrderType" NOT NULL DEFAULT 'delivery',
    "isWeedTextOrder" BOOLEAN NOT NULL DEFAULT false,
    "subtotal" INTEGER NOT NULL,
    "taxFactor" DOUBLE PRECISION NOT NULL,
    "taxAmount" INTEGER NOT NULL,
    "deliveryFee" INTEGER NOT NULL DEFAULT 0,
    "mileageFee" INTEGER NOT NULL DEFAULT 0,
    "platformFee" INTEGER NOT NULL DEFAULT 0,
    "total" INTEGER NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "deliveryDeadline" TIMESTAMP(3) NOT NULL,
    "orderStatus" "OrderStatus" NOT NULL DEFAULT 'Pending',
    "customerId" TEXT NOT NULL,
    "addressId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "driverId" TEXT,
    "isDriverAssigned" BOOLEAN NOT NULL DEFAULT false,
    "driverAssignedAt" TIMESTAMP(3),
    "isProductPickedUp" BOOLEAN NOT NULL DEFAULT false,
    "productPickedUpAt" TIMESTAMP(3),
    "isDeliveredOrder" BOOLEAN NOT NULL DEFAULT false,
    "deliveredAt" TIMESTAMP(3),
    "isCustomerReceivedOrder" BOOLEAN NOT NULL DEFAULT false,
    "customerReceivedOrderAt" TIMESTAMP(3),
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),
    "duration" INTEGER,
    "isDeliveredOnTime" BOOLEAN,
    "purchaseId" TEXT,
    "routeId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Purchase" (
    "id" TEXT NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'Pending',
    "gateway" TEXT NOT NULL DEFAULT 'stripe',
    "type" TEXT NOT NULL DEFAULT 'card',
    "amount" DOUBLE PRECISION NOT NULL,
    "token" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "stripeAccountId" TEXT,
    "stripeOnboardingComplete" BOOLEAN NOT NULL DEFAULT false,
    "addressId" TEXT NOT NULL,
    "dialCode" TEXT NOT NULL,
    "phone" TEXT,
    "termsAccepted" BOOLEAN NOT NULL DEFAULT false,
    "subdomainId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "showInMarketPlace" BOOLEAN NOT NULL DEFAULT true,
    "subscribedForDelivery" BOOLEAN NOT NULL DEFAULT true,
    "subscribedForPickup" BOOLEAN NOT NULL DEFAULT false,
    "subscribedForWeedText" BOOLEAN NOT NULL DEFAULT true,
    "vendorId" TEXT,
    "vendorName" TEXT,
    "ecommerceUrl" TEXT,
    "pos" "POS" NOT NULL DEFAULT 'none',
    "inventory" "Inventory" NOT NULL DEFAULT 'none',
    "metrcLicenseNumber" TEXT,
    "metrcUserKey" TEXT,
    "dutchieKey" TEXT,
    "weedmapsKey" TEXT,
    "blazeKey" TEXT,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" TEXT NOT NULL,
    "days" INTEGER,
    "day" "Day" DEFAULT 'Monday',
    "openAt" INTEGER NOT NULL DEFAULT 900,
    "closeAt" INTEGER NOT NULL DEFAULT 2000,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "organizationId" TEXT,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "features" TEXT,
    "organizationId" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "tags" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductVariant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "organizationName" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "unit" "Unit" NOT NULL DEFAULT 'g',
    "size" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "basePrice" INTEGER NOT NULL,
    "discount" INTEGER NOT NULL,
    "isDiscount" BOOLEAN NOT NULL DEFAULT false,
    "salePrice" INTEGER NOT NULL,
    "currency" "CurrencyName" NOT NULL DEFAULT 'USD',
    "stock" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductVariant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductCategories" (
    "categoryListId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "ProductCategories_pkey" PRIMARY KEY ("categoryListId","categoryId")
);

-- CreateTable
CREATE TABLE "CategoryList" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CategoryList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceList" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "slug" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "comment" TEXT,
    "productId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSetting" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'Your Shop Title',
    "bannerText" TEXT DEFAULT 'Welcome',
    "description" TEXT DEFAULT 'We''ve launched our shop on Gras! Browse our goods.',
    "primaryColor" TEXT DEFAULT '#14a33d',
    "secondaryColor" TEXT DEFAULT '#13622a',
    "tertiaryColor" TEXT DEFAULT '#fff2da',
    "textColor" TEXT DEFAULT '#a8a8a8',
    "backgroundColor" TEXT DEFAULT '#ffffff',
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubDomain" (
    "id" TEXT NOT NULL,
    "isValid" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubDomain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "tag" "ArticleTag",
    "content" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeaturesBackend" (
    "feature" "FeatureBe" NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "FeaturesFrontend" (
    "feature" "FeatureFe" NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "DailyDeal" (
    "title" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" TIMESTAMP(3) NOT NULL,
    "isExpired" BOOLEAN NOT NULL DEFAULT false,
    "total" INTEGER NOT NULL,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "DailyDeal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "all_auth_recipe_users" (
    "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "tenant_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "user_id" CHAR(36) NOT NULL,
    "primary_or_recipe_user_id" CHAR(36) NOT NULL,
    "is_linked_or_is_a_primary_user" BOOLEAN NOT NULL DEFAULT false,
    "recipe_id" VARCHAR(128) NOT NULL,
    "time_joined" BIGINT NOT NULL,
    "primary_or_recipe_user_time_joined" BIGINT NOT NULL,

    CONSTRAINT "all_auth_recipe_users_pkey" PRIMARY KEY ("app_id","tenant_id","user_id")
);

-- CreateTable
CREATE TABLE "app_id_to_user_id" (
    "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "user_id" CHAR(36) NOT NULL,
    "recipe_id" VARCHAR(128) NOT NULL,
    "primary_or_recipe_user_id" CHAR(36) NOT NULL,
    "is_linked_or_is_a_primary_user" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "app_id_to_user_id_pkey" PRIMARY KEY ("app_id","user_id")
);

-- CreateTable
CREATE TABLE "apps" (
    "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "created_at_time" BIGINT,

    CONSTRAINT "apps_pkey" PRIMARY KEY ("app_id")
);

-- CreateTable
CREATE TABLE "dashboard_user_sessions" (
    "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "session_id" CHAR(36) NOT NULL,
    "user_id" CHAR(36) NOT NULL,
    "time_created" BIGINT NOT NULL,
    "expiry" BIGINT NOT NULL,

    CONSTRAINT "dashboard_user_sessions_pkey" PRIMARY KEY ("app_id","session_id")
);

-- CreateTable
CREATE TABLE "dashboard_users" (
    "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "user_id" CHAR(36) NOT NULL,
    "email" VARCHAR(256) NOT NULL,
    "password_hash" VARCHAR(256) NOT NULL,
    "time_joined" BIGINT NOT NULL,

    CONSTRAINT "dashboard_users_pkey" PRIMARY KEY ("app_id","user_id")
);

-- CreateTable
CREATE TABLE "emailpassword_pswd_reset_tokens" (
    "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "user_id" CHAR(36) NOT NULL,
    "token" VARCHAR(128) NOT NULL,
    "email" VARCHAR(256),
    "token_expiry" BIGINT NOT NULL,

    CONSTRAINT "emailpassword_pswd_reset_tokens_pkey" PRIMARY KEY ("app_id","user_id","token")
);

-- CreateTable
CREATE TABLE "emailpassword_user_to_tenant" (
    "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "tenant_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "user_id" CHAR(36) NOT NULL,
    "email" VARCHAR(256) NOT NULL,

    CONSTRAINT "emailpassword_user_to_tenant_pkey" PRIMARY KEY ("app_id","tenant_id","user_id")
);

-- CreateTable
CREATE TABLE "emailpassword_users" (
    "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "user_id" CHAR(36) NOT NULL,
    "email" VARCHAR(256) NOT NULL,
    "password_hash" VARCHAR(256) NOT NULL,
    "time_joined" BIGINT NOT NULL,

    CONSTRAINT "emailpassword_users_pkey" PRIMARY KEY ("app_id","user_id")
);

-- CreateTable
CREATE TABLE "emailverification_tokens" (
    "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "tenant_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "user_id" VARCHAR(128) NOT NULL,
    "email" VARCHAR(256) NOT NULL,
    "token" VARCHAR(128) NOT NULL,
    "token_expiry" BIGINT NOT NULL,

    CONSTRAINT "emailverification_tokens_pkey" PRIMARY KEY ("app_id","tenant_id","user_id","email","token")
);

-- CreateTable
CREATE TABLE "emailverification_verified_emails" (
    "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "user_id" VARCHAR(128) NOT NULL,
    "email" VARCHAR(256) NOT NULL,

    CONSTRAINT "emailverification_verified_emails_pkey" PRIMARY KEY ("app_id","user_id","email")
);

-- CreateTable
CREATE TABLE "jwt_signing_keys" (
    "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "key_id" VARCHAR(255) NOT NULL,
    "key_string" TEXT NOT NULL,
    "algorithm" VARCHAR(10) NOT NULL,
    "created_at" BIGINT,

    CONSTRAINT "jwt_signing_keys_pkey" PRIMARY KEY ("app_id","key_id")
);

-- CreateTable
CREATE TABLE "key_value" (
    "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "tenant_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "name" VARCHAR(128) NOT NULL,
    "value" TEXT,
    "created_at_time" BIGINT,

    CONSTRAINT "key_value_pkey" PRIMARY KEY ("app_id","tenant_id","name")
);

-- CreateTable
CREATE TABLE "passwordless_codes" (
    "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "tenant_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "code_id" CHAR(36) NOT NULL,
    "device_id_hash" CHAR(44) NOT NULL,
    "link_code_hash" CHAR(44) NOT NULL,
    "created_at" BIGINT NOT NULL,

    CONSTRAINT "passwordless_codes_pkey" PRIMARY KEY ("app_id","tenant_id","code_id")
);

-- CreateTable
CREATE TABLE "passwordless_devices" (
    "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "tenant_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "device_id_hash" CHAR(44) NOT NULL,
    "email" VARCHAR(256),
    "phone_number" VARCHAR(256),
    "link_code_salt" CHAR(44) NOT NULL,
    "failed_attempts" INTEGER NOT NULL,

    CONSTRAINT "passwordless_devices_pkey" PRIMARY KEY ("app_id","tenant_id","device_id_hash")
);

-- CreateTable
CREATE TABLE "passwordless_user_to_tenant" (
    "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "tenant_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "user_id" CHAR(36) NOT NULL,
    "email" VARCHAR(256),
    "phone_number" VARCHAR(256),

    CONSTRAINT "passwordless_user_to_tenant_pkey" PRIMARY KEY ("app_id","tenant_id","user_id")
);

-- CreateTable
CREATE TABLE "passwordless_users" (
    "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "user_id" CHAR(36) NOT NULL,
    "email" VARCHAR(256),
    "phone_number" VARCHAR(256),
    "time_joined" BIGINT NOT NULL,

    CONSTRAINT "passwordless_users_pkey" PRIMARY KEY ("app_id","user_id")
);

-- CreateTable
CREATE TABLE "role_permissions" (
    "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "role" VARCHAR(255) NOT NULL,
    "permission" VARCHAR(255) NOT NULL,

    CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("app_id","role","permission")
);

-- CreateTable
CREATE TABLE "roles" (
    "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "role" VARCHAR(255) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("app_id","role")
);

-- CreateTable
CREATE TABLE "session_access_token_signing_keys" (
    "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "created_at_time" BIGINT NOT NULL,
    "value" TEXT,

    CONSTRAINT "session_access_token_signing_keys_pkey" PRIMARY KEY ("app_id","created_at_time")
);

-- CreateTable
CREATE TABLE "session_info" (
    "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "tenant_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "session_handle" VARCHAR(255) NOT NULL,
    "user_id" VARCHAR(128) NOT NULL,
    "refresh_token_hash_2" VARCHAR(128) NOT NULL,
    "session_data" TEXT,
    "expires_at" BIGINT NOT NULL,
    "created_at_time" BIGINT NOT NULL,
    "jwt_user_payload" TEXT,
    "use_static_key" BOOLEAN NOT NULL,

    CONSTRAINT "session_info_pkey" PRIMARY KEY ("app_id","tenant_id","session_handle")
);

-- CreateTable
CREATE TABLE "tenant_configs" (
    "connection_uri_domain" VARCHAR(256) NOT NULL DEFAULT '',
    "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "tenant_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "core_config" TEXT,
    "email_password_enabled" BOOLEAN,
    "passwordless_enabled" BOOLEAN,
    "third_party_enabled" BOOLEAN,

    CONSTRAINT "tenant_configs_pkey" PRIMARY KEY ("connection_uri_domain","app_id","tenant_id")
);

-- CreateTable
CREATE TABLE "tenant_thirdparty_provider_clients" (
    "connection_uri_domain" VARCHAR(256) NOT NULL DEFAULT '',
    "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "tenant_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "third_party_id" VARCHAR(28) NOT NULL,
    "client_type" VARCHAR(64) NOT NULL DEFAULT '',
    "client_id" VARCHAR(256) NOT NULL,
    "client_secret" TEXT,
    "scope" VARCHAR(128)[],
    "force_pkce" BOOLEAN,
    "additional_config" TEXT,

    CONSTRAINT "tenant_thirdparty_provider_clients_pkey" PRIMARY KEY ("connection_uri_domain","app_id","tenant_id","third_party_id","client_type")
);

-- CreateTable
CREATE TABLE "tenant_thirdparty_providers" (
    "connection_uri_domain" VARCHAR(256) NOT NULL DEFAULT '',
    "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "tenant_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "third_party_id" VARCHAR(28) NOT NULL,
    "name" VARCHAR(64),
    "authorization_endpoint" TEXT,
    "authorization_endpoint_query_params" TEXT,
    "token_endpoint" TEXT,
    "token_endpoint_body_params" TEXT,
    "user_info_endpoint" TEXT,
    "user_info_endpoint_query_params" TEXT,
    "user_info_endpoint_headers" TEXT,
    "jwks_uri" TEXT,
    "oidc_discovery_endpoint" TEXT,
    "require_email" BOOLEAN,
    "user_info_map_from_id_token_payload_user_id" VARCHAR(64),
    "user_info_map_from_id_token_payload_email" VARCHAR(64),
    "user_info_map_from_id_token_payload_email_verified" VARCHAR(64),
    "user_info_map_from_user_info_endpoint_user_id" VARCHAR(64),
    "user_info_map_from_user_info_endpoint_email" VARCHAR(64),
    "user_info_map_from_user_info_endpoint_email_verified" VARCHAR(64),

    CONSTRAINT "tenant_thirdparty_providers_pkey" PRIMARY KEY ("connection_uri_domain","app_id","tenant_id","third_party_id")
);

-- CreateTable
CREATE TABLE "tenants" (
    "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "tenant_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "created_at_time" BIGINT,

    CONSTRAINT "tenants_pkey" PRIMARY KEY ("app_id","tenant_id")
);

-- CreateTable
CREATE TABLE "thirdparty_user_to_tenant" (
    "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "tenant_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "user_id" CHAR(36) NOT NULL,
    "third_party_id" VARCHAR(28) NOT NULL,
    "third_party_user_id" VARCHAR(256) NOT NULL,

    CONSTRAINT "thirdparty_user_to_tenant_pkey" PRIMARY KEY ("app_id","tenant_id","user_id")
);

-- CreateTable
CREATE TABLE "thirdparty_users" (
    "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "third_party_id" VARCHAR(28) NOT NULL,
    "third_party_user_id" VARCHAR(256) NOT NULL,
    "user_id" CHAR(36) NOT NULL,
    "email" VARCHAR(256) NOT NULL,
    "time_joined" BIGINT NOT NULL,

    CONSTRAINT "thirdparty_users_pkey" PRIMARY KEY ("app_id","user_id")
);

-- CreateTable
CREATE TABLE "totp_used_codes" (
    "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "tenant_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "user_id" VARCHAR(128) NOT NULL,
    "code" VARCHAR(8) NOT NULL,
    "is_valid" BOOLEAN NOT NULL,
    "expiry_time_ms" BIGINT NOT NULL,
    "created_time_ms" BIGINT NOT NULL,

    CONSTRAINT "totp_used_codes_pkey" PRIMARY KEY ("app_id","tenant_id","user_id","created_time_ms")
);

-- CreateTable
CREATE TABLE "totp_user_devices" (
    "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "user_id" VARCHAR(128) NOT NULL,
    "device_name" VARCHAR(256) NOT NULL,
    "secret_key" VARCHAR(256) NOT NULL,
    "period" INTEGER NOT NULL,
    "skew" INTEGER NOT NULL,
    "verified" BOOLEAN NOT NULL,

    CONSTRAINT "totp_user_devices_pkey" PRIMARY KEY ("app_id","user_id","device_name")
);

-- CreateTable
CREATE TABLE "totp_users" (
    "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "user_id" VARCHAR(128) NOT NULL,

    CONSTRAINT "totp_users_pkey" PRIMARY KEY ("app_id","user_id")
);

-- CreateTable
CREATE TABLE "user_last_active" (
    "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "user_id" VARCHAR(128) NOT NULL,
    "last_active_time" BIGINT,

    CONSTRAINT "user_last_active_pkey" PRIMARY KEY ("app_id","user_id")
);

-- CreateTable
CREATE TABLE "user_metadata" (
    "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "user_id" VARCHAR(128) NOT NULL,
    "user_metadata" TEXT NOT NULL,

    CONSTRAINT "user_metadata_pkey" PRIMARY KEY ("app_id","user_id")
);

-- CreateTable
CREATE TABLE "user_roles" (
    "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "tenant_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "user_id" VARCHAR(128) NOT NULL,
    "role" VARCHAR(255) NOT NULL,

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("app_id","tenant_id","user_id","role")
);

-- CreateTable
CREATE TABLE "userid_mapping" (
    "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "supertokens_user_id" CHAR(36) NOT NULL,
    "external_user_id" VARCHAR(128) NOT NULL,
    "external_user_id_info" TEXT,

    CONSTRAINT "userid_mapping_pkey" PRIMARY KEY ("app_id","supertokens_user_id","external_user_id")
);

-- CreateTable
CREATE TABLE "_AddressToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_OrderToProductVariant" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CategoryToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ServiceToServiceList" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_DailyDealToProductVariant" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_id_key" ON "Account"("id");

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_id_key" ON "Session"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionHandle_key" ON "Session"("sessionHandle");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE INDEX "Session_sessionHandle_idx" ON "Session"("sessionHandle");

-- CreateIndex
CREATE UNIQUE INDEX "Compliance_id_key" ON "Compliance"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Compliance_state_key" ON "Compliance"("state");

-- CreateIndex
CREATE UNIQUE INDEX "LicenseGuidelines_state_key" ON "LicenseGuidelines"("state");

-- CreateIndex
CREATE UNIQUE INDEX "TransportGuidelines_state_key" ON "TransportGuidelines"("state");

-- CreateIndex
CREATE UNIQUE INDEX "SaleGuidelines_state_key" ON "SaleGuidelines"("state");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE INDEX "User_id_idx" ON "User"("id");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_phone_idx" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Driver_email_key" ON "Driver"("email");

-- CreateIndex
CREATE INDEX "Driver_id_idx" ON "Driver"("id");

-- CreateIndex
CREATE INDEX "Driver_email_idx" ON "Driver"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_id_key" ON "Vehicle"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DriverSession_id_key" ON "DriverSession"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DriverSession_routeId_key" ON "DriverSession"("routeId");

-- CreateIndex
CREATE INDEX "DriverSession_id_idx" ON "DriverSession"("id");

-- CreateIndex
CREATE INDEX "DriverSession_routeId_idx" ON "DriverSession"("routeId");

-- CreateIndex
CREATE UNIQUE INDEX "Route_orderId_key" ON "Route"("orderId");

-- CreateIndex
CREATE INDEX "Route_driverId_idx" ON "Route"("driverId");

-- CreateIndex
CREATE INDEX "Route_orderId_idx" ON "Route"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_id_key" ON "Vendor"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_name_key" ON "Vendor"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_publicName_key" ON "Vendor"("publicName");

-- CreateIndex
CREATE INDEX "Vendor_id_idx" ON "Vendor"("id");

-- CreateIndex
CREATE INDEX "Vendor_name_idx" ON "Vendor"("name");

-- CreateIndex
CREATE INDEX "Vendor_publicName_idx" ON "Vendor"("publicName");

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_id_name_key" ON "Vendor"("id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Address_id_key" ON "Address"("id");

-- CreateIndex
CREATE INDEX "Address_id_idx" ON "Address"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ImageOrganization_id_key" ON "ImageOrganization"("id");

-- CreateIndex
CREATE INDEX "ImageOrganization_organizationId_idx" ON "ImageOrganization"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "ImageProduct_id_key" ON "ImageProduct"("id");

-- CreateIndex
CREATE INDEX "ImageProduct_variantId_idx" ON "ImageProduct"("variantId");

-- CreateIndex
CREATE UNIQUE INDEX "ImageUser_id_key" ON "ImageUser"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ImageUser_userId_key" ON "ImageUser"("userId");

-- CreateIndex
CREATE INDEX "ImageUser_userId_idx" ON "ImageUser"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ImageVendor_id_key" ON "ImageVendor"("id");

-- CreateIndex
CREATE INDEX "ImageVendor_id_idx" ON "ImageVendor"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ImageArticle_id_key" ON "ImageArticle"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ImageArticle_articleId_key" ON "ImageArticle"("articleId");

-- CreateIndex
CREATE INDEX "ImageArticle_articleId_idx" ON "ImageArticle"("articleId");

-- CreateIndex
CREATE UNIQUE INDEX "Coordinates_id_key" ON "Coordinates"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Membership_id_key" ON "Membership"("id");

-- CreateIndex
CREATE INDEX "Membership_userId_idx" ON "Membership"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Membership_id_organizationId_key" ON "Membership"("id", "organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_id_key" ON "Order"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Order_purchaseId_key" ON "Order"("purchaseId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_routeId_key" ON "Order"("routeId");

-- CreateIndex
CREATE INDEX "Order_addressId_idx" ON "Order"("addressId");

-- CreateIndex
CREATE INDEX "Order_customerId_idx" ON "Order"("customerId");

-- CreateIndex
CREATE INDEX "Order_driverId_idx" ON "Order"("driverId");

-- CreateIndex
CREATE INDEX "Order_organizationId_idx" ON "Order"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_id_key" ON "Purchase"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_orderId_key" ON "Purchase"("orderId");

-- CreateIndex
CREATE INDEX "Purchase_orderId_idx" ON "Purchase"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_id_key" ON "Organization"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_name_key" ON "Organization"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_stripeAccountId_key" ON "Organization"("stripeAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_addressId_key" ON "Organization"("addressId");

-- CreateIndex
CREATE INDEX "Organization_id_idx" ON "Organization"("id");

-- CreateIndex
CREATE INDEX "Organization_name_idx" ON "Organization"("name");

-- CreateIndex
CREATE INDEX "Organization_vendorId_idx" ON "Organization"("vendorId");

-- CreateIndex
CREATE INDEX "Organization_subdomainId_idx" ON "Organization"("subdomainId");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_id_name_key" ON "Organization"("id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Schedule_id_key" ON "Schedule"("id");

-- CreateIndex
CREATE INDEX "Schedule_id_idx" ON "Schedule"("id");

-- CreateIndex
CREATE INDEX "Schedule_organizationId_idx" ON "Schedule"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");

-- CreateIndex
CREATE INDEX "Product_id_idx" ON "Product"("id");

-- CreateIndex
CREATE INDEX "Product_organizationId_idx" ON "Product"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariant_id_key" ON "ProductVariant"("id");

-- CreateIndex
CREATE INDEX "ProductVariant_id_idx" ON "ProductVariant"("id");

-- CreateIndex
CREATE INDEX "ProductVariant_productId_idx" ON "ProductVariant"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_id_key" ON "Category"("id");

-- CreateIndex
CREATE INDEX "Category_name_idx" ON "Category"("name");

-- CreateIndex
CREATE INDEX "ProductCategories_categoryListId_idx" ON "ProductCategories"("categoryListId");

-- CreateIndex
CREATE INDEX "ProductCategories_categoryId_idx" ON "ProductCategories"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "CategoryList_id_key" ON "CategoryList"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CategoryList_organizationId_key" ON "CategoryList"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceList_id_key" ON "ServiceList"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceList_slug_key" ON "ServiceList"("slug");

-- CreateIndex
CREATE INDEX "ServiceList_slug_idx" ON "ServiceList"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Service_id_key" ON "Service"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Service_slug_key" ON "Service"("slug");

-- CreateIndex
CREATE INDEX "Service_title_idx" ON "Service"("title");

-- CreateIndex
CREATE INDEX "Service_slug_idx" ON "Service"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Review_id_key" ON "Review"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Review_productId_key" ON "Review"("productId");

-- CreateIndex
CREATE INDEX "Review_userId_idx" ON "Review"("userId");

-- CreateIndex
CREATE INDEX "Review_productId_idx" ON "Review"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "SiteSetting_id_key" ON "SiteSetting"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SiteSetting_organizationId_key" ON "SiteSetting"("organizationId");

-- CreateIndex
CREATE INDEX "SiteSetting_id_idx" ON "SiteSetting"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SubDomain_id_key" ON "SubDomain"("id");

-- CreateIndex
CREATE INDEX "SubDomain_id_idx" ON "SubDomain"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Article_id_key" ON "Article"("id");

-- CreateIndex
CREATE INDEX "Article_id_idx" ON "Article"("id");

-- CreateIndex
CREATE INDEX "Article_title_idx" ON "Article"("title");

-- CreateIndex
CREATE UNIQUE INDEX "FeaturesBackend_feature_key" ON "FeaturesBackend"("feature");

-- CreateIndex
CREATE UNIQUE INDEX "FeaturesFrontend_feature_key" ON "FeaturesFrontend"("feature");

-- CreateIndex
CREATE UNIQUE INDEX "DailyDeal_id_key" ON "DailyDeal"("id");

-- CreateIndex
CREATE INDEX "all_auth_recipe_tenant_id_index" ON "all_auth_recipe_users"("app_id", "tenant_id");

-- CreateIndex
CREATE INDEX "all_auth_recipe_user_id_index" ON "all_auth_recipe_users"("app_id", "user_id");

-- CreateIndex
CREATE INDEX "all_auth_recipe_users_pagination_index1" ON "all_auth_recipe_users"("app_id", "tenant_id", "primary_or_recipe_user_time_joined" DESC, "primary_or_recipe_user_id" DESC);

-- CreateIndex
CREATE INDEX "all_auth_recipe_users_pagination_index2" ON "all_auth_recipe_users"("app_id", "tenant_id", "primary_or_recipe_user_time_joined", "primary_or_recipe_user_id" DESC);

-- CreateIndex
CREATE INDEX "all_auth_recipe_users_pagination_index3" ON "all_auth_recipe_users"("recipe_id", "app_id", "tenant_id", "primary_or_recipe_user_time_joined" DESC, "primary_or_recipe_user_id" DESC);

-- CreateIndex
CREATE INDEX "all_auth_recipe_users_pagination_index4" ON "all_auth_recipe_users"("recipe_id", "app_id", "tenant_id", "primary_or_recipe_user_time_joined", "primary_or_recipe_user_id" DESC);

-- CreateIndex
CREATE INDEX "all_auth_recipe_users_primary_user_id_index" ON "all_auth_recipe_users"("primary_or_recipe_user_id", "app_id");

-- CreateIndex
CREATE INDEX "all_auth_recipe_users_recipe_id_index" ON "all_auth_recipe_users"("app_id", "recipe_id", "tenant_id");

-- CreateIndex
CREATE INDEX "app_id_to_user_id_app_id_index" ON "app_id_to_user_id"("app_id");

-- CreateIndex
CREATE INDEX "app_id_to_user_id_primary_user_id_index" ON "app_id_to_user_id"("primary_or_recipe_user_id", "app_id");

-- CreateIndex
CREATE INDEX "dashboard_user_sessions_expiry_index" ON "dashboard_user_sessions"("expiry");

-- CreateIndex
CREATE INDEX "dashboard_user_sessions_user_id_index" ON "dashboard_user_sessions"("app_id", "user_id");

-- CreateIndex
CREATE INDEX "dashboard_users_app_id_index" ON "dashboard_users"("app_id");

-- CreateIndex
CREATE UNIQUE INDEX "dashboard_users_email_key" ON "dashboard_users"("app_id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "emailpassword_pswd_reset_tokens_token_key" ON "emailpassword_pswd_reset_tokens"("token");

-- CreateIndex
CREATE INDEX "emailpassword_password_reset_token_expiry_index" ON "emailpassword_pswd_reset_tokens"("token_expiry");

-- CreateIndex
CREATE INDEX "emailpassword_pswd_reset_tokens_user_id_index" ON "emailpassword_pswd_reset_tokens"("app_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "emailpassword_user_to_tenant_email_key" ON "emailpassword_user_to_tenant"("app_id", "tenant_id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "emailverification_tokens_token_key" ON "emailverification_tokens"("token");

-- CreateIndex
CREATE INDEX "emailverification_tokens_index" ON "emailverification_tokens"("token_expiry");

-- CreateIndex
CREATE INDEX "emailverification_tokens_tenant_id_index" ON "emailverification_tokens"("app_id", "tenant_id");

-- CreateIndex
CREATE INDEX "emailverification_verified_emails_app_id_index" ON "emailverification_verified_emails"("app_id");

-- CreateIndex
CREATE INDEX "jwt_signing_keys_app_id_index" ON "jwt_signing_keys"("app_id");

-- CreateIndex
CREATE INDEX "key_value_tenant_id_index" ON "key_value"("app_id", "tenant_id");

-- CreateIndex
CREATE INDEX "passwordless_codes_created_at_index" ON "passwordless_codes"("app_id", "tenant_id", "created_at");

-- CreateIndex
CREATE INDEX "passwordless_codes_device_id_hash_index" ON "passwordless_codes"("app_id", "tenant_id", "device_id_hash");

-- CreateIndex
CREATE UNIQUE INDEX "passwordless_codes_link_code_hash_key" ON "passwordless_codes"("app_id", "tenant_id", "link_code_hash");

-- CreateIndex
CREATE INDEX "passwordless_devices_email_index" ON "passwordless_devices"("app_id", "tenant_id", "email");

-- CreateIndex
CREATE INDEX "passwordless_devices_phone_number_index" ON "passwordless_devices"("app_id", "tenant_id", "phone_number");

-- CreateIndex
CREATE INDEX "passwordless_devices_tenant_id_index" ON "passwordless_devices"("app_id", "tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "passwordless_user_to_tenant_email_key" ON "passwordless_user_to_tenant"("app_id", "tenant_id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "passwordless_user_to_tenant_phone_number_key" ON "passwordless_user_to_tenant"("app_id", "tenant_id", "phone_number");

-- CreateIndex
CREATE INDEX "role_permissions_permission_index" ON "role_permissions"("app_id", "permission");

-- CreateIndex
CREATE INDEX "role_permissions_role_index" ON "role_permissions"("app_id", "role");

-- CreateIndex
CREATE INDEX "roles_app_id_index" ON "roles"("app_id");

-- CreateIndex
CREATE INDEX "access_token_signing_keys_app_id_index" ON "session_access_token_signing_keys"("app_id");

-- CreateIndex
CREATE INDEX "session_expiry_index" ON "session_info"("expires_at");

-- CreateIndex
CREATE INDEX "session_info_tenant_id_index" ON "session_info"("app_id", "tenant_id");

-- CreateIndex
CREATE INDEX "tenant_thirdparty_provider_clients_third_party_id_index" ON "tenant_thirdparty_provider_clients"("connection_uri_domain", "app_id", "tenant_id", "third_party_id");

-- CreateIndex
CREATE INDEX "tenant_thirdparty_providers_tenant_id_index" ON "tenant_thirdparty_providers"("connection_uri_domain", "app_id", "tenant_id");

-- CreateIndex
CREATE INDEX "tenants_app_id_index" ON "tenants"("app_id");

-- CreateIndex
CREATE UNIQUE INDEX "thirdparty_user_to_tenant_third_party_user_id_key" ON "thirdparty_user_to_tenant"("app_id", "tenant_id", "third_party_id", "third_party_user_id");

-- CreateIndex
CREATE INDEX "thirdparty_users_email_index" ON "thirdparty_users"("app_id", "email");

-- CreateIndex
CREATE INDEX "thirdparty_users_thirdparty_user_id_index" ON "thirdparty_users"("app_id", "third_party_id", "third_party_user_id");

-- CreateIndex
CREATE INDEX "totp_used_codes_expiry_time_ms_index" ON "totp_used_codes"("app_id", "tenant_id", "expiry_time_ms");

-- CreateIndex
CREATE INDEX "totp_used_codes_tenant_id_index" ON "totp_used_codes"("app_id", "tenant_id");

-- CreateIndex
CREATE INDEX "totp_used_codes_user_id_index" ON "totp_used_codes"("app_id", "user_id");

-- CreateIndex
CREATE INDEX "totp_user_devices_user_id_index" ON "totp_user_devices"("app_id", "user_id");

-- CreateIndex
CREATE INDEX "totp_users_app_id_index" ON "totp_users"("app_id");

-- CreateIndex
CREATE INDEX "user_last_active_app_id_index" ON "user_last_active"("app_id");

-- CreateIndex
CREATE INDEX "user_metadata_app_id_index" ON "user_metadata"("app_id");

-- CreateIndex
CREATE INDEX "user_roles_app_id_role_index" ON "user_roles"("app_id", "role");

-- CreateIndex
CREATE INDEX "user_roles_role_index" ON "user_roles"("app_id", "tenant_id", "role");

-- CreateIndex
CREATE INDEX "user_roles_tenant_id_index" ON "user_roles"("app_id", "tenant_id");

-- CreateIndex
CREATE INDEX "userid_mapping_supertokens_user_id_index" ON "userid_mapping"("app_id", "supertokens_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "userid_mapping_external_user_id_key" ON "userid_mapping"("app_id", "external_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "userid_mapping_supertokens_user_id_key" ON "userid_mapping"("app_id", "supertokens_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "_AddressToUser_AB_unique" ON "_AddressToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_AddressToUser_B_index" ON "_AddressToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_OrderToProductVariant_AB_unique" ON "_OrderToProductVariant"("A", "B");

-- CreateIndex
CREATE INDEX "_OrderToProductVariant_B_index" ON "_OrderToProductVariant"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToProduct_AB_unique" ON "_CategoryToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToProduct_B_index" ON "_CategoryToProduct"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ServiceToServiceList_AB_unique" ON "_ServiceToServiceList"("A", "B");

-- CreateIndex
CREATE INDEX "_ServiceToServiceList_B_index" ON "_ServiceToServiceList"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DailyDealToProductVariant_AB_unique" ON "_DailyDealToProductVariant"("A", "B");

-- CreateIndex
CREATE INDEX "_DailyDealToProductVariant_B_index" ON "_DailyDealToProductVariant"("B");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LicenseGuidelines" ADD CONSTRAINT "LicenseGuidelines_state_fkey" FOREIGN KEY ("state") REFERENCES "Compliance"("state") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransportGuidelines" ADD CONSTRAINT "TransportGuidelines_state_fkey" FOREIGN KEY ("state") REFERENCES "Compliance"("state") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleGuidelines" ADD CONSTRAINT "SaleGuidelines_state_fkey" FOREIGN KEY ("state") REFERENCES "Compliance"("state") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DriverSession" ADD CONSTRAINT "DriverSession_id_fkey" FOREIGN KEY ("id") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_coordinateId_fkey" FOREIGN KEY ("coordinateId") REFERENCES "Coordinates"("id") ON DELETE CASCADE ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "ImageOrganization" ADD CONSTRAINT "ImageOrganization_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageProduct" ADD CONSTRAINT "ImageProduct_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "ProductVariant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageUser" ADD CONSTRAINT "ImageUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageArticle" ADD CONSTRAINT "ImageArticle_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_subdomainId_fkey" FOREIGN KEY ("subdomainId") REFERENCES "SubDomain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_vendorId_vendorName_fkey" FOREIGN KEY ("vendorId", "vendorName") REFERENCES "Vendor"("id", "name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariant" ADD CONSTRAINT "ProductVariant_organizationId_organizationName_fkey" FOREIGN KEY ("organizationId", "organizationName") REFERENCES "Organization"("id", "name") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariant" ADD CONSTRAINT "ProductVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProductCategories" ADD CONSTRAINT "ProductCategories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCategories" ADD CONSTRAINT "ProductCategories_categoryListId_fkey" FOREIGN KEY ("categoryListId") REFERENCES "CategoryList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryList" ADD CONSTRAINT "CategoryList_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SiteSetting" ADD CONSTRAINT "SiteSetting_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyDeal" ADD CONSTRAINT "DailyDeal_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "all_auth_recipe_users" ADD CONSTRAINT "all_auth_recipe_users_primary_or_recipe_user_id_fkey" FOREIGN KEY ("app_id", "primary_or_recipe_user_id") REFERENCES "app_id_to_user_id"("app_id", "user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "all_auth_recipe_users" ADD CONSTRAINT "all_auth_recipe_users_tenant_id_fkey" FOREIGN KEY ("app_id", "tenant_id") REFERENCES "tenants"("app_id", "tenant_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "all_auth_recipe_users" ADD CONSTRAINT "all_auth_recipe_users_user_id_fkey" FOREIGN KEY ("app_id", "user_id") REFERENCES "app_id_to_user_id"("app_id", "user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "app_id_to_user_id" ADD CONSTRAINT "app_id_to_user_id_app_id_fkey" FOREIGN KEY ("app_id") REFERENCES "apps"("app_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "app_id_to_user_id" ADD CONSTRAINT "app_id_to_user_id_primary_or_recipe_user_id_fkey" FOREIGN KEY ("app_id", "primary_or_recipe_user_id") REFERENCES "app_id_to_user_id"("app_id", "user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "dashboard_user_sessions" ADD CONSTRAINT "dashboard_user_sessions_user_id_fkey" FOREIGN KEY ("app_id", "user_id") REFERENCES "dashboard_users"("app_id", "user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dashboard_users" ADD CONSTRAINT "dashboard_users_app_id_fkey" FOREIGN KEY ("app_id") REFERENCES "apps"("app_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "emailpassword_pswd_reset_tokens" ADD CONSTRAINT "emailpassword_pswd_reset_tokens_user_id_fkey" FOREIGN KEY ("app_id", "user_id") REFERENCES "app_id_to_user_id"("app_id", "user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emailpassword_user_to_tenant" ADD CONSTRAINT "emailpassword_user_to_tenant_user_id_fkey" FOREIGN KEY ("app_id", "tenant_id", "user_id") REFERENCES "all_auth_recipe_users"("app_id", "tenant_id", "user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "emailpassword_users" ADD CONSTRAINT "emailpassword_users_user_id_fkey" FOREIGN KEY ("app_id", "user_id") REFERENCES "app_id_to_user_id"("app_id", "user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "emailverification_tokens" ADD CONSTRAINT "emailverification_tokens_tenant_id_fkey" FOREIGN KEY ("app_id", "tenant_id") REFERENCES "tenants"("app_id", "tenant_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "emailverification_verified_emails" ADD CONSTRAINT "emailverification_verified_emails_app_id_fkey" FOREIGN KEY ("app_id") REFERENCES "apps"("app_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "jwt_signing_keys" ADD CONSTRAINT "jwt_signing_keys_app_id_fkey" FOREIGN KEY ("app_id") REFERENCES "apps"("app_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "key_value" ADD CONSTRAINT "key_value_tenant_id_fkey" FOREIGN KEY ("app_id", "tenant_id") REFERENCES "tenants"("app_id", "tenant_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "passwordless_codes" ADD CONSTRAINT "passwordless_codes_device_id_hash_fkey" FOREIGN KEY ("app_id", "tenant_id", "device_id_hash") REFERENCES "passwordless_devices"("app_id", "tenant_id", "device_id_hash") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "passwordless_devices" ADD CONSTRAINT "passwordless_devices_tenant_id_fkey" FOREIGN KEY ("app_id", "tenant_id") REFERENCES "tenants"("app_id", "tenant_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "passwordless_user_to_tenant" ADD CONSTRAINT "passwordless_user_to_tenant_user_id_fkey" FOREIGN KEY ("app_id", "tenant_id", "user_id") REFERENCES "all_auth_recipe_users"("app_id", "tenant_id", "user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "passwordless_users" ADD CONSTRAINT "passwordless_users_user_id_fkey" FOREIGN KEY ("app_id", "user_id") REFERENCES "app_id_to_user_id"("app_id", "user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_role_fkey" FOREIGN KEY ("app_id", "role") REFERENCES "roles"("app_id", "role") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_app_id_fkey" FOREIGN KEY ("app_id") REFERENCES "apps"("app_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "session_access_token_signing_keys" ADD CONSTRAINT "session_access_token_signing_keys_app_id_fkey" FOREIGN KEY ("app_id") REFERENCES "apps"("app_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "session_info" ADD CONSTRAINT "session_info_tenant_id_fkey" FOREIGN KEY ("app_id", "tenant_id") REFERENCES "tenants"("app_id", "tenant_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tenant_thirdparty_provider_clients" ADD CONSTRAINT "tenant_thirdparty_provider_clients_third_party_id_fkey" FOREIGN KEY ("connection_uri_domain", "app_id", "tenant_id", "third_party_id") REFERENCES "tenant_thirdparty_providers"("connection_uri_domain", "app_id", "tenant_id", "third_party_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tenant_thirdparty_providers" ADD CONSTRAINT "tenant_thirdparty_providers_tenant_id_fkey" FOREIGN KEY ("connection_uri_domain", "app_id", "tenant_id") REFERENCES "tenant_configs"("connection_uri_domain", "app_id", "tenant_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tenants" ADD CONSTRAINT "tenants_app_id_fkey" FOREIGN KEY ("app_id") REFERENCES "apps"("app_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "thirdparty_user_to_tenant" ADD CONSTRAINT "thirdparty_user_to_tenant_user_id_fkey" FOREIGN KEY ("app_id", "tenant_id", "user_id") REFERENCES "all_auth_recipe_users"("app_id", "tenant_id", "user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "thirdparty_users" ADD CONSTRAINT "thirdparty_users_user_id_fkey" FOREIGN KEY ("app_id", "user_id") REFERENCES "app_id_to_user_id"("app_id", "user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "totp_used_codes" ADD CONSTRAINT "totp_used_codes_tenant_id_fkey" FOREIGN KEY ("app_id", "tenant_id") REFERENCES "tenants"("app_id", "tenant_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "totp_used_codes" ADD CONSTRAINT "totp_used_codes_user_id_fkey" FOREIGN KEY ("app_id", "user_id") REFERENCES "totp_users"("app_id", "user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "totp_user_devices" ADD CONSTRAINT "totp_user_devices_user_id_fkey" FOREIGN KEY ("app_id", "user_id") REFERENCES "totp_users"("app_id", "user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "totp_users" ADD CONSTRAINT "totp_users_app_id_fkey" FOREIGN KEY ("app_id") REFERENCES "apps"("app_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_last_active" ADD CONSTRAINT "user_last_active_app_id_fkey" FOREIGN KEY ("app_id") REFERENCES "apps"("app_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_metadata" ADD CONSTRAINT "user_metadata_app_id_fkey" FOREIGN KEY ("app_id") REFERENCES "apps"("app_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_role_fkey" FOREIGN KEY ("app_id", "role") REFERENCES "roles"("app_id", "role") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_tenant_id_fkey" FOREIGN KEY ("app_id", "tenant_id") REFERENCES "tenants"("app_id", "tenant_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "userid_mapping" ADD CONSTRAINT "userid_mapping_supertokens_user_id_fkey" FOREIGN KEY ("app_id", "supertokens_user_id") REFERENCES "app_id_to_user_id"("app_id", "user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "_AddressToUser" ADD CONSTRAINT "_AddressToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AddressToUser" ADD CONSTRAINT "_AddressToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderToProductVariant" ADD CONSTRAINT "_OrderToProductVariant_A_fkey" FOREIGN KEY ("A") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderToProductVariant" ADD CONSTRAINT "_OrderToProductVariant_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToProduct" ADD CONSTRAINT "_CategoryToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToProduct" ADD CONSTRAINT "_CategoryToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ServiceToServiceList" ADD CONSTRAINT "_ServiceToServiceList_A_fkey" FOREIGN KEY ("A") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ServiceToServiceList" ADD CONSTRAINT "_ServiceToServiceList_B_fkey" FOREIGN KEY ("B") REFERENCES "ServiceList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DailyDealToProductVariant" ADD CONSTRAINT "_DailyDealToProductVariant_A_fkey" FOREIGN KEY ("A") REFERENCES "DailyDeal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DailyDealToProductVariant" ADD CONSTRAINT "_DailyDealToProductVariant_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
