-- CreateEnum
CREATE TYPE "Inventory" AS ENUM ('none', 'dutchie', 'weedmaps', 'blaze');

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "inventory" "Inventory" NOT NULL DEFAULT 'none';
