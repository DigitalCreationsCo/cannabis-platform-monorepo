/*
  Warnings:

  - You are about to drop the column `total` on the `DailyDeal` table. All the data in the column will be lost.
  - You are about to drop the `_DailyDealToProductVariant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_DailyDealToProductVariant" DROP CONSTRAINT "_DailyDealToProductVariant_A_fkey";

-- DropForeignKey
ALTER TABLE "_DailyDealToProductVariant" DROP CONSTRAINT "_DailyDealToProductVariant_B_fkey";

-- AlterTable
ALTER TABLE "DailyDeal" DROP COLUMN "total";

-- DropTable
DROP TABLE "_DailyDealToProductVariant";
