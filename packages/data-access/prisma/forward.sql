-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('delivery', 'pickup');

-- AlterEnum
ALTER TYPE "Inventory" ADD VALUE 'metrc';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "OrderStatus" ADD VALUE 'ReadyForPickup';
ALTER TYPE "OrderStatus" ADD VALUE 'ReadyForDelivery';

-- DropForeignKey
ALTER TABLE "emailpassword_pswd_reset_tokens" DROP CONSTRAINT "emailpassword_pswd_reset_tokens_user_id_fkey";

-- DropForeignKey
ALTER TABLE "passwordless_codes" DROP CONSTRAINT "passwordless_codes_device_id_hash_fkey";

-- DropForeignKey
ALTER TABLE "role_permissions" DROP CONSTRAINT "role_permissions_role_fkey";

-- DropForeignKey
ALTER TABLE "user_roles" DROP CONSTRAINT "user_roles_role_fkey";

-- DropIndex
DROP INDEX "all_auth_recipe_users_pagination_index";

-- DropIndex
DROP INDEX "emailpassword_users_email_key";

-- DropIndex
DROP INDEX "passwordless_codes_created_at_index";

-- DropIndex
DROP INDEX "passwordless_codes_device_id_hash_index";

-- DropIndex
DROP INDEX "passwordless_codes_link_code_hash_key";

-- DropIndex
DROP INDEX "passwordless_devices_email_index";

-- DropIndex
DROP INDEX "passwordless_devices_phone_number_index";

-- DropIndex
DROP INDEX "passwordless_users_email_key";

-- DropIndex
DROP INDEX "passwordless_users_phone_number_key";

-- DropIndex
DROP INDEX "role_permissions_permission_index";

-- DropIndex
DROP INDEX "thirdparty_users_user_id_key";

-- DropIndex
DROP INDEX "user_roles_role_index";

-- AlterTable
ALTER TABLE "Driver" ADD COLUMN     "licenseNumber" TEXT;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "type" "OrderType" NOT NULL DEFAULT 'delivery';

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "blazeKey" TEXT,
ADD COLUMN     "dutchieKey" TEXT,
ADD COLUMN     "metrcLicenseNumber" TEXT,
ADD COLUMN     "metrcUserKey" TEXT,
ADD COLUMN     "weedmapsKey" TEXT;

-- AlterTable
ALTER TABLE "all_auth_recipe_users" DROP CONSTRAINT "all_auth_recipe_users_pkey",
ADD COLUMN     "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
ADD COLUMN     "is_linked_or_is_a_primary_user" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "primary_or_recipe_user_id" CHAR(36) NOT NULL,
ADD COLUMN     "primary_or_recipe_user_time_joined" BIGINT NOT NULL,
ADD COLUMN     "tenant_id" VARCHAR(64) NOT NULL DEFAULT 'public',
ADD CONSTRAINT "all_auth_recipe_users_pkey" PRIMARY KEY ("app_id", "tenant_id", "user_id");

-- AlterTable
ALTER TABLE "emailpassword_pswd_reset_tokens" DROP CONSTRAINT "emailpassword_pswd_reset_tokens_pkey",
ADD COLUMN     "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
ADD COLUMN     "email" VARCHAR(256),
ADD CONSTRAINT "emailpassword_pswd_reset_tokens_pkey" PRIMARY KEY ("app_id", "user_id", "token");

-- AlterTable
ALTER TABLE "emailpassword_users" DROP CONSTRAINT "emailpassword_users_pkey",
ADD COLUMN     "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
ALTER COLUMN "password_hash" SET DATA TYPE VARCHAR(256),
ADD CONSTRAINT "emailpassword_users_pkey" PRIMARY KEY ("app_id", "user_id");

-- AlterTable
ALTER TABLE "emailverification_tokens" DROP CONSTRAINT "emailverification_tokens_pkey",
ADD COLUMN     "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
ADD COLUMN     "tenant_id" VARCHAR(64) NOT NULL DEFAULT 'public',
ADD CONSTRAINT "emailverification_tokens_pkey" PRIMARY KEY ("app_id", "tenant_id", "user_id", "email", "token");

-- AlterTable
ALTER TABLE "emailverification_verified_emails" DROP CONSTRAINT "emailverification_verified_emails_pkey",
ADD COLUMN     "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
ADD CONSTRAINT "emailverification_verified_emails_pkey" PRIMARY KEY ("app_id", "user_id", "email");

-- AlterTable
ALTER TABLE "jwt_signing_keys" DROP CONSTRAINT "jwt_signing_keys_pkey",
ADD COLUMN     "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
ADD CONSTRAINT "jwt_signing_keys_pkey" PRIMARY KEY ("app_id", "key_id");

-- AlterTable
ALTER TABLE "key_value" DROP CONSTRAINT "key_value_pkey",
ADD COLUMN     "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
ADD COLUMN     "tenant_id" VARCHAR(64) NOT NULL DEFAULT 'public',
ADD CONSTRAINT "key_value_pkey" PRIMARY KEY ("app_id", "tenant_id", "name");

-- AlterTable
ALTER TABLE "passwordless_codes" DROP CONSTRAINT "passwordless_codes_pkey",
ADD COLUMN     "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
ADD COLUMN     "tenant_id" VARCHAR(64) NOT NULL DEFAULT 'public',
ADD CONSTRAINT "passwordless_codes_pkey" PRIMARY KEY ("app_id", "tenant_id", "code_id");

-- AlterTable
ALTER TABLE "passwordless_devices" DROP CONSTRAINT "passwordless_devices_pkey",
ADD COLUMN     "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
ADD COLUMN     "tenant_id" VARCHAR(64) NOT NULL DEFAULT 'public',
ADD CONSTRAINT "passwordless_devices_pkey" PRIMARY KEY ("app_id", "tenant_id", "device_id_hash");

-- AlterTable
ALTER TABLE "passwordless_users" DROP CONSTRAINT "passwordless_users_pkey",
ADD COLUMN     "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
ADD CONSTRAINT "passwordless_users_pkey" PRIMARY KEY ("app_id", "user_id");

-- AlterTable
ALTER TABLE "role_permissions" DROP CONSTRAINT "role_permissions_pkey",
ADD COLUMN     "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
ADD CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("app_id", "role", "permission");

-- AlterTable
ALTER TABLE "roles" DROP CONSTRAINT "roles_pkey",
ADD COLUMN     "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
ADD CONSTRAINT "roles_pkey" PRIMARY KEY ("app_id", "role");

-- AlterTable
ALTER TABLE "session_access_token_signing_keys" DROP CONSTRAINT "session_access_token_signing_keys_pkey",
ADD COLUMN     "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
ADD CONSTRAINT "session_access_token_signing_keys_pkey" PRIMARY KEY ("app_id", "created_at_time");

-- AlterTable
ALTER TABLE "session_info" DROP CONSTRAINT "session_info_pkey",
ADD COLUMN     "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
ADD COLUMN     "tenant_id" VARCHAR(64) NOT NULL DEFAULT 'public',
ADD COLUMN     "use_static_key" BOOLEAN NOT NULL,
ADD CONSTRAINT "session_info_pkey" PRIMARY KEY ("app_id", "tenant_id", "session_handle");

-- AlterTable
ALTER TABLE "thirdparty_users" DROP CONSTRAINT "thirdparty_users_pkey",
ADD COLUMN     "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
ALTER COLUMN "third_party_user_id" SET DATA TYPE VARCHAR(256),
ADD CONSTRAINT "thirdparty_users_pkey" PRIMARY KEY ("app_id", "user_id");

-- AlterTable
ALTER TABLE "user_metadata" DROP CONSTRAINT "user_metadata_pkey",
ADD COLUMN     "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
ADD CONSTRAINT "user_metadata_pkey" PRIMARY KEY ("app_id", "user_id");

-- AlterTable
ALTER TABLE "user_roles" DROP CONSTRAINT "user_roles_pkey",
ADD COLUMN     "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
ADD COLUMN     "tenant_id" VARCHAR(64) NOT NULL DEFAULT 'public',
ADD CONSTRAINT "user_roles_pkey" PRIMARY KEY ("app_id", "tenant_id", "user_id", "role");

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
CREATE TABLE "emailpassword_user_to_tenant" (
    "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "tenant_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "user_id" CHAR(36) NOT NULL,
    "email" VARCHAR(256) NOT NULL,

    CONSTRAINT "emailpassword_user_to_tenant_pkey" PRIMARY KEY ("app_id","tenant_id","user_id")
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
CREATE TABLE "thirdparty_user_to_tenant" (
    "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "tenant_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "user_id" CHAR(36) NOT NULL,
    "third_party_id" VARCHAR(28) NOT NULL,
    "third_party_user_id" VARCHAR(256) NOT NULL,

    CONSTRAINT "thirdparty_user_to_tenant_pkey" PRIMARY KEY ("app_id","tenant_id","user_id")
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
CREATE TABLE "userid_mapping" (
    "app_id" VARCHAR(64) NOT NULL DEFAULT 'public',
    "supertokens_user_id" CHAR(36) NOT NULL,
    "external_user_id" VARCHAR(128) NOT NULL,
    "external_user_id_info" TEXT,

    CONSTRAINT "userid_mapping_pkey" PRIMARY KEY ("app_id","supertokens_user_id","external_user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_id_key" ON "Vehicle"("id");

-- CreateIndex
CREATE INDEX "dashboard_user_sessions_expiry_index" ON "dashboard_user_sessions"("expiry");

-- CreateIndex
CREATE INDEX "dashboard_user_sessions_user_id_index" ON "dashboard_user_sessions"("app_id", "user_id");

-- CreateIndex
CREATE INDEX "dashboard_users_app_id_index" ON "dashboard_users"("app_id");

-- CreateIndex
CREATE UNIQUE INDEX "dashboard_users_email_key" ON "dashboard_users"("app_id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "emailpassword_user_to_tenant_email_key" ON "emailpassword_user_to_tenant"("app_id", "tenant_id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "passwordless_user_to_tenant_email_key" ON "passwordless_user_to_tenant"("app_id", "tenant_id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "passwordless_user_to_tenant_phone_number_key" ON "passwordless_user_to_tenant"("app_id", "tenant_id", "phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "thirdparty_user_to_tenant_third_party_user_id_key" ON "thirdparty_user_to_tenant"("app_id", "tenant_id", "third_party_id", "third_party_user_id");

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
CREATE INDEX "userid_mapping_supertokens_user_id_index" ON "userid_mapping"("app_id", "supertokens_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "userid_mapping_external_user_id_key" ON "userid_mapping"("app_id", "external_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "userid_mapping_supertokens_user_id_key" ON "userid_mapping"("app_id", "supertokens_user_id");

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
CREATE INDEX "emailpassword_pswd_reset_tokens_user_id_index" ON "emailpassword_pswd_reset_tokens"("app_id", "user_id");

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
CREATE INDEX "thirdparty_users_email_index" ON "thirdparty_users"("app_id", "email");

-- CreateIndex
CREATE INDEX "thirdparty_users_thirdparty_user_id_index" ON "thirdparty_users"("app_id", "third_party_id", "third_party_user_id");

-- CreateIndex
CREATE INDEX "user_metadata_app_id_index" ON "user_metadata"("app_id");

-- CreateIndex
CREATE INDEX "user_roles_app_id_role_index" ON "user_roles"("app_id", "role");

-- CreateIndex
CREATE INDEX "user_roles_role_index" ON "user_roles"("app_id", "tenant_id", "role");

-- CreateIndex
CREATE INDEX "user_roles_tenant_id_index" ON "user_roles"("app_id", "tenant_id");

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "all_auth_recipe_users" ADD CONSTRAINT "all_auth_recipe_users_primary_or_recipe_user_id_fkey" FOREIGN KEY ("app_id", "primary_or_recipe_user_id") REFERENCES "app_id_to_user_id"("app_id", "user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "all_auth_recipe_users" ADD CONSTRAINT "all_auth_recipe_users_tenant_id_fkey" FOREIGN KEY ("app_id", "tenant_id") REFERENCES "tenants"("app_id", "tenant_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "all_auth_recipe_users" ADD CONSTRAINT "all_auth_recipe_users_user_id_fkey" FOREIGN KEY ("app_id", "user_id") REFERENCES "app_id_to_user_id"("app_id", "user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

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
ALTER TABLE "user_metadata" ADD CONSTRAINT "user_metadata_app_id_fkey" FOREIGN KEY ("app_id") REFERENCES "apps"("app_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_role_fkey" FOREIGN KEY ("app_id", "role") REFERENCES "roles"("app_id", "role") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_tenant_id_fkey" FOREIGN KEY ("app_id", "tenant_id") REFERENCES "tenants"("app_id", "tenant_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "userid_mapping" ADD CONSTRAINT "userid_mapping_supertokens_user_id_fkey" FOREIGN KEY ("app_id", "supertokens_user_id") REFERENCES "app_id_to_user_id"("app_id", "user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

