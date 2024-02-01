-- DropForeignKey
ALTER TABLE "Membership" DROP CONSTRAINT "Membership_organizationId_fkey";

-- DropIndex
DROP INDEX "Membership_id_organizationId_key";

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
