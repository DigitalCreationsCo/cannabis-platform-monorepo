/*
  Warnings:

  - Added the required column `deliveryDeadline` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "deliveryDeadline" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "subscribed" BOOLEAN NOT NULL DEFAULT false;
