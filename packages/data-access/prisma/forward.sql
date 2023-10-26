-- CreateEnum
CREATE TYPE "LicenseType" AS ENUM ('dispensary', 'delivery');

-- CreateEnum
CREATE TYPE "USState" AS ENUM ('ALABAMA', 'ALASKA', 'ARIZONA', 'ARKANSAS', 'CALIFORNIA', 'COLORADO', 'CONNECTICUT', 'DELAWARE', 'FLORIDA', 'GEORGIA', 'HAWAII', 'IDAHO', 'ILLINOIS', 'INDIANA', 'IOWA', 'KANSAS', 'KENTUCKY', 'LOUISIANA', 'MAINE', 'MARYLAND', 'MASSACHUSETTS', 'MICHIGAN', 'MINNESOTA', 'MISSISSIPPI', 'MISSOURI', 'MONTANA', 'NEBRASKA', 'NEVADA', 'NEW_HAMPSHIRE', 'NEW_JERSEY', 'NEW_MEXICO', 'NEW_YORK', 'NORTH_CAROLINA', 'NORTH_DAKOTA', 'OHIO', 'OKLAHOMA', 'OREGON', 'PENNSYLVANIA', 'RHODE_ISLAND', 'SOUTH_CAROLINA', 'SOUTH_DAKOTA', 'TENNESSEE', 'TEXAS', 'UTAH', 'VERMONT', 'VIRGINIA', 'WASHINGTON', 'WEST_VIRGINIA', 'WISCONSIN', 'WYOMING');

-- CreateEnum
CREATE TYPE "USStateAbbreviated" AS ENUM ('AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY');

-- CreateEnum
CREATE TYPE "ArticleTag" AS ENUM ('dispensaries', 'drivers', 'events', 'entertainment', 'culture', 'art', 'sports', 'science', 'politics', 'business', 'health', 'food', 'gras');

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "tag",
ADD COLUMN     "tag" "ArticleTag" NOT NULL;

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "ecommerceUrl" TEXT,
ADD COLUMN     "showInMarketPlace" BOOLEAN NOT NULL DEFAULT false;

-- DropEnum
DROP TYPE "ArticleType";

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

-- AddForeignKey
ALTER TABLE "LicenseGuidelines" ADD CONSTRAINT "LicenseGuidelines_state_fkey" FOREIGN KEY ("state") REFERENCES "Compliance"("state") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransportGuidelines" ADD CONSTRAINT "TransportGuidelines_state_fkey" FOREIGN KEY ("state") REFERENCES "Compliance"("state") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleGuidelines" ADD CONSTRAINT "SaleGuidelines_state_fkey" FOREIGN KEY ("state") REFERENCES "Compliance"("state") ON DELETE RESTRICT ON UPDATE CASCADE;

