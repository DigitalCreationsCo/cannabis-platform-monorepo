/*
  Warnings:

  - You are about to drop the column `subscribedForDelivery` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `subscribedForPickup` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `subscribedForWeedText` on the `Organization` table. All the data in the column will be lost.
  - Added the required column `alt` to the `ImageArticle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alt` to the `ImageOrganization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alt` to the `ImageProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alt` to the `ImageUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alt` to the `ImageVendor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Inventory" ADD VALUE 'biotrack';

-- AlterTable
ALTER TABLE "DailyDeal" ALTER COLUMN "startTime" DROP NOT NULL,
ALTER COLUMN "endTime" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ImageArticle" ADD COLUMN     "alt" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ImageOrganization" ADD COLUMN     "alt" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ImageProduct" ADD COLUMN     "alt" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ImageUser" ADD COLUMN     "alt" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ImageVendor" ADD COLUMN     "alt" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "subscribedForDelivery",
DROP COLUMN "subscribedForPickup",
DROP COLUMN "subscribedForWeedText",
ADD COLUMN     "isSubscribedForDailyDeals" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isSubscribedForDelivery" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isSubscribedForPickup" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "subscriptionPlanId" TEXT;

-- AlterTable
ALTER TABLE "SiteSetting" ALTER COLUMN "description" SET DEFAULT 'Our shop is open! Browse our goods.';

-- CreateTable
CREATE TABLE "SubscriptionPlan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "featuresDelivery" BOOLEAN NOT NULL DEFAULT true,
    "deliveryLimit" INTEGER NOT NULL,
    "featuresPickup" BOOLEAN NOT NULL DEFAULT false,
    "featuresDailyDeals" BOOLEAN NOT NULL DEFAULT true,
    "price" INTEGER NOT NULL,
    "currency" "CurrencyName" NOT NULL DEFAULT 'USD',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubscriptionPlan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SubscriptionPlan_id_key" ON "SubscriptionPlan"("id");

-- CreateIndex
CREATE INDEX "SubscriptionPlan_id_idx" ON "SubscriptionPlan"("id");

-- CreateIndex
CREATE INDEX "SubscriptionPlan_name_idx" ON "SubscriptionPlan"("name");

-- CreateIndex
CREATE INDEX "ProductVariant_organizationId_organizationName_idx" ON "ProductVariant"("organizationId", "organizationName");

-- CreateIndex
CREATE INDEX "ProductVariant_productId_organizationId_idx" ON "ProductVariant"("productId", "organizationId");

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_subscriptionPlanId_fkey" FOREIGN KEY ("subscriptionPlanId") REFERENCES "SubscriptionPlan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
