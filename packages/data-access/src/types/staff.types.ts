import { type Dispensary } from './dispensary.types';
import { type Role } from './role.types';
import { type User } from './user.types';

export interface StaffMember extends User {
	id: string;
	email: string;
	role: Role; // roles are user wide, not specific roles to teams
	createdAt: Date;
	updatedAt: Date;
	teams: string[]; // multiple dispensary Ids
}

export interface StaffMemberWithDispensary extends StaffMember {
	teamSlug: string; // 1 dispensary slug
	teamId: string; // 1 dispensary Id
	team: Dispensary; // details of 1 dispensary
}

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
