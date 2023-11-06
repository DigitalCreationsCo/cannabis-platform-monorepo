-- DropForeignKey
ALTER TABLE "Organization" DROP CONSTRAINT "Organization_vendorId_vendorName_fkey";

-- AlterTable
ALTER TABLE "Organization" ALTER COLUMN "vendorId" DROP NOT NULL,
ALTER COLUMN "vendorName" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SiteSetting" ALTER COLUMN "description" SET DEFAULT 'We''ve launched our shop on Gras! Browse our goods.',
ALTER COLUMN "title" SET DEFAULT 'Your Shop Title',
ALTER COLUMN "bannerText" SET DEFAULT 'Welcome',
ALTER COLUMN "textColor" SET DEFAULT '#a8a8a8';

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_vendorId_vendorName_fkey" FOREIGN KEY ("vendorId", "vendorName") REFERENCES "Vendor"("id", "name") ON DELETE SET NULL ON UPDATE CASCADE;
