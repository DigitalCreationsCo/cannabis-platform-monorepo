import { type User, type Role, type StaffMember } from '@cd/data-access';
import { ApiError } from '../errors';
import { type Action, type Resource, permissions } from '../lib/permissions';

// /**
//  * Checks if the user has the given membership role or greater
//  * MembershipRole heirachy: OWNER > ADMIN > MEMBER > null
//  * @param user
//  * @param role
//  */
export const hasMembershipRoleAccess = (user: User, role: Role) => {
	if (user.role) {
		// memberships[0] will be the highest role, if the user has multiple roles, using the standard find queries in `packages/data-access/src/user.ts`
		const membershipRole = user.role;
		switch (role) {
			case 'OWNER':
				return membershipRole === 'OWNER';
			case 'ADMIN':
				return membershipRole === 'ADMIN' || membershipRole === 'OWNER';
			case 'MEMBER':
				return (
					membershipRole === 'MEMBER' ||
					membershipRole === 'ADMIN' ||
					membershipRole === 'OWNER'
				);
			default:
				return false;
		}
	}
	return false;
};

export const isAllowed = (role: Role, resource: Resource, action: Action) => {
	const rolePermissions = permissions[role];

	if (!rolePermissions) {
		return false;
	}

	for (const permission of rolePermissions) {
		if (
			permission.resource === resource &&
			(permission.actions === '*' || permission.actions.includes(action))
		) {
			return true;
		}
	}

	return false;
};

export const throwIfNotAllowed = (
	user: Pick<StaffMember, 'role'>,
	resource: Resource,
	action: Action
) => {
	if (isAllowed(user.role, resource, action)) {
		return true;
	}

	throw new ApiError(
		403,
		`You are not allowed to perform ${action} on ${resource}`
	);
};

export const isLegalAgeAndVerified = (
	user?: User
): { verified: boolean; isLegal: boolean } | false => {
	if (
		typeof user?.id_verified === 'undefined' ||
		user?.id_verified === false ||
		typeof user?.is_legal_age === 'undefined' ||
		user?.is_legal_age === false
	)
		return false;
	return { verified: user.id_verified, isLegal: user.is_legal_age as boolean };
};
