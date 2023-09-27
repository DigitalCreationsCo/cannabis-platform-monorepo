-- AlterEnum
ALTER TYPE "OrderStatus" ADD VALUE 'Completed';

-- DropForeignKey
ALTER TABLE "Route" DROP CONSTRAINT "Route_orderId_fkey";

-- AlterTable
ALTER TABLE "ProductVariant" ALTER COLUMN "isDiscount" SET DEFAULT false,
ALTER COLUMN "currency" SET DEFAULT 'USD';

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
