/*
  Warnings:

  - You are about to alter the column `createdAt` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `Account` MODIFY `createdAt` DATETIME NOT NULL,
    MODIFY `updatedAt` DATETIME NOT NULL;
