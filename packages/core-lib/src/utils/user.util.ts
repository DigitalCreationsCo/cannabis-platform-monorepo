import { type MembershipRole, type UserWithDetails } from '@cd/data-access';

/**
 * Checks if the user has the given membership role or greater
 * MembershipRole heirachy: OWNER > ADMIN > MEMBER > null
 * @param user
 * @param role
 */
function hasMembershipRoleAccess(user: UserWithDetails, role: MembershipRole) {
	if (user.memberships) {
		// memberships[0] will be the highest role, if the user has multiple roles, using the standard find queries in `packages/data-access/src/user.ts`
		const membershipRole = user.memberships?.[0]?.role.toLocaleUpperCase();
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
}

export { hasMembershipRoleAccess };
