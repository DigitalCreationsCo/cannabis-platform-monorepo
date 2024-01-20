-- DropForeignKey
ALTER TABLE "_MembershipToOrganization" DROP CONSTRAINT "_MembershipToOrganization_A_fkey";

-- DropForeignKey
ALTER TABLE "_MembershipToOrganization" DROP CONSTRAINT "_MembershipToOrganization_B_fkey";

-- DropTable
DROP TABLE "_MembershipToOrganization";

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

