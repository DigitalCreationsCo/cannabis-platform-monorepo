import { type Dispensary } from '../dispensary/dispensary.types';
import { type Role } from '../role.types';
import { type User } from '../user/user.types';

export type StaffMember = {
	id: string;
	email: string;
	userId: string;
	role: Role;
	createdAt: Date;
	updatedAt: Date;
	team: Dispensary;
	teamId: string;
};

export type StaffMemberWithUser = {
	id: string;
	email: string;
	userId: string;
	user: User;
	role: Role;
	team: Dispensary;
	teamId: string;
	createdAt: Date;
	updatedAt: Date;
};

// export type UserDispensaryStaff = User & {
// 	profilePicture: ImageUser | null;
// 	memberships: Prisma.MembershipUpsertArgs['create'][];
// };

// export type UserDispensaryStaffWithDispensaryDetails = User & {
// 	profilePicture: ImageUser | null;
// 	memberships: MembershipWithOrganizationDashboardDetails[];
// };

// export type MembershipWithUser = Membership & {
// 	user: User;
// };

// export type MembershipWithOrganizationDashboardDetails =
// 	Prisma.MembershipUpsertArgs['create'] & {
// 		organizations: OrganizationWithDashboardDetails;
// 	};
