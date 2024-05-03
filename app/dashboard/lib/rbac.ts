import { ApiError } from '@cd/core-lib';
import { Role, type StaffMember, getStaffMember } from '@cd/data-access';

export async function validateMembershipOperation(
	memberId: string,
	teamMember: StaffMember,
	operationMeta?: {
		role?: Role;
	},
) {
	const updatingMember = await getStaffMember(memberId, teamMember.team.slug);
	// Member and Admin can't update the role of Owner
	if (
		(teamMember.role === Role.MEMBER || teamMember.role === Role.ADMIN) &&
		updatingMember.role === Role.OWNER
	) {
		throw new ApiError(
			403,
			'You do not have permission to update the role of this member.',
		);
	}
	// Member can't update the role of Admin & Owner
	if (
		teamMember.role === Role.MEMBER &&
		(updatingMember.role === Role.ADMIN || updatingMember.role === Role.OWNER)
	) {
		throw new ApiError(
			403,
			'You do not have permission to update the role of this member.',
		);
	}

	// Admin can't make anyone an Owner
	if (teamMember.role === Role.ADMIN && operationMeta?.role === Role.OWNER) {
		throw new ApiError(
			403,
			'You do not have permission to update the role of this member to Owner.',
		);
	}

	// Member can't make anyone an Admin or Owner
	if (
		teamMember.role === Role.MEMBER &&
		(operationMeta?.role === Role.ADMIN || operationMeta?.role === Role.OWNER)
	) {
		throw new ApiError(
			403,
			'You do not have permission to update the role of this member to Admin.',
		);
	}
}
