/*
  Warnings:

  - The `state` column on the `Address` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `country` column on the `Address` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `countryCode` column on the `Address` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Country" AS ENUM ('United States', 'Canada');

-- CreateEnum
CREATE TYPE "CountryCode" AS ENUM ('US', 'CN');

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "state",
ADD COLUMN     "state" "USStateAbbreviated" DEFAULT 'MD',
DROP COLUMN "country",
ADD COLUMN     "country" "Country" NOT NULL DEFAULT 'United States',
DROP COLUMN "countryCode",
ADD COLUMN     "countryCode" "CountryCode" DEFAULT 'US';

-- AlterTable
ALTER TABLE "Organization" ALTER COLUMN "showInMarketPlace" SET DEFAULT true;
