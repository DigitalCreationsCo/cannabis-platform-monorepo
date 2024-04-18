/*
  Warnings:

  - Added the required column `doesRepeat` to the `DailyDeal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DailyDeal" ADD COLUMN     "doesRepeat" BOOLEAN NOT NULL,
ADD COLUMN     "schedule" TEXT;
