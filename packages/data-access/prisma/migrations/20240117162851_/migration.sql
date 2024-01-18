/*
  Warnings:

  - You are about to drop the `_MembershipToOrganization` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MembershipToOrganization" DROP CONSTRAINT "_MembershipToOrganization_A_fkey";

-- DropForeignKey
ALTER TABLE "_MembershipToOrganization" DROP CONSTRAINT "_MembershipToOrganization_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isSubscribedForWeedText" BOOLEAN NOT NULL DEFAULT true;

-- DropTable
DROP TABLE "_MembershipToOrganization";

-- CreateTable
CREATE TABLE "WeedTextDeal" (
    "title" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" TIMESTAMP(3) NOT NULL,
    "total" INTEGER NOT NULL,

    CONSTRAINT "WeedTextDeal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductVariantToWeedTextDeal" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "WeedTextDeal_id_key" ON "WeedTextDeal"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductVariantToWeedTextDeal_AB_unique" ON "_ProductVariantToWeedTextDeal"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductVariantToWeedTextDeal_B_index" ON "_ProductVariantToWeedTextDeal"("B");

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductVariantToWeedTextDeal" ADD CONSTRAINT "_ProductVariantToWeedTextDeal_A_fkey" FOREIGN KEY ("A") REFERENCES "ProductVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductVariantToWeedTextDeal" ADD CONSTRAINT "_ProductVariantToWeedTextDeal_B_fkey" FOREIGN KEY ("B") REFERENCES "WeedTextDeal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
