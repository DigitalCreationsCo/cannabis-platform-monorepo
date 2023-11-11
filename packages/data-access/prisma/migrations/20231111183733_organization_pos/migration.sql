-- CreateEnum
CREATE TYPE "POS" AS ENUM ('none', 'dutchie', 'weedmaps', 'blaze');

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "pos" "POS" NOT NULL DEFAULT 'none';
