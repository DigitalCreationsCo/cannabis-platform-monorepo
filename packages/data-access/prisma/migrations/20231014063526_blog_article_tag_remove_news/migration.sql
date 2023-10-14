/*
  Warnings:

  - The values [news] on the enum `ArticleType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ArticleType_new" AS ENUM ('dispensaries', 'drivers', 'events', 'entertainment', 'culture', 'art', 'sports', 'science', 'politics', 'business', 'health', 'food', 'gras');
ALTER TABLE "Article" ALTER COLUMN "tag" TYPE "ArticleType_new" USING ("tag"::text::"ArticleType_new");
ALTER TYPE "ArticleType" RENAME TO "ArticleType_old";
ALTER TYPE "ArticleType_new" RENAME TO "ArticleType";
DROP TYPE "ArticleType_old";
COMMIT;
