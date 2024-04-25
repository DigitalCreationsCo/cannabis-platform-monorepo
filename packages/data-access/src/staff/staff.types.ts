import { type Role } from '../role.types';

export type StaffMember = {
	_id: string;
	email: string;
	role: Role;
	createdAt: Date;
	updatedAt: Date;
};

export type UserDispensaryStaff = User & {
	profilePicture: ImageUser | null;
	memberships: Prisma.MembershipUpsertArgs['create'][];
};

export type UserDispensaryStaffWithDispensaryDetails = User & {
	profilePicture: ImageUser | null;
	memberships: MembershipWithOrganizationDashboardDetails[];
};

export type MembershipWithUser = Membership & {
	user: User;
};

export type MembershipWithOrganizationDashboardDetails =
	Prisma.MembershipUpsertArgs['create'] & {
		organizations: OrganizationWithDashboardDetails;
	};
