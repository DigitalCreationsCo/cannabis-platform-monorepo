/*
  Warnings:

  - You are about to drop the column `isLateDelivery` on the `Order` table. All the data in the column will be lost.
  - Added the required column `organizationId` to the `WeedTextDeal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "isLateDelivery",
ADD COLUMN     "isDeliveredOnTime" BOOLEAN,
ADD COLUMN     "isWeedTextOrder" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "subscribedForWeedText" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "subscribedForDelivery" SET DEFAULT true;

-- AlterTable
ALTER TABLE "WeedTextDeal" ADD COLUMN     "isExpired" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "organizationId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "WeedTextDeal" ADD CONSTRAINT "WeedTextDeal_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
