import { UserWithDetails } from '@cd/data-access';
import { hasMembershipRoleAccess } from '../../src/utils/user.util';
describe('User Utils Tests', () => {
	const userWithMemberRole = {
		firstName: 'Doug',
		memberships: [
			{
				id: '1',
				role: 'MEMBER',
				organizationId: '2',
				userId: '1',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		],
	} as UserWithDetails;
	const userWithAdminRole = {
		firstName: 'Rick',
		memberships: [
			{
				id: '1',
				role: 'ADMIN',
				organizationId: '2',
				userId: '1',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		],
	} as UserWithDetails;
	const userWithOwnerRole = {
		firstName: 'Denise',
		memberships: [
			{
				id: '1',
				role: 'OWNER',
				organizationId: '2',
				userId: '1',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		],
	} as UserWithDetails;

	it('user with MEMBER role has MEMBER level access', async () => {
		expect(hasMembershipRoleAccess(userWithMemberRole, 'MEMBER')).toEqual(true);
	});
	it('user with MEMBER role does not have ADMIN level access', async () => {
		expect(hasMembershipRoleAccess(userWithMemberRole, 'ADMIN')).toEqual(false);
	});
	it('user with MEMBER role does not have OWNER level access', async () => {
		expect(hasMembershipRoleAccess(userWithMemberRole, 'OWNER')).toEqual(false);
	});
	it('user with ADMIN role has MEMBER level access', async () => {
		expect(hasMembershipRoleAccess(userWithAdminRole, 'MEMBER')).toEqual(true);
	});
	it('user with ADMIN role has ADMIN level access', async () => {
		expect(hasMembershipRoleAccess(userWithAdminRole, 'ADMIN')).toEqual(true);
	});
	it('user with ADMIN role does not have OWNER level access', async () => {
		expect(hasMembershipRoleAccess(userWithAdminRole, 'OWNER')).toEqual(false);
	});
	it('user with OWNER role has MEMBER level access', async () => {
		expect(hasMembershipRoleAccess(userWithOwnerRole, 'MEMBER')).toEqual(true);
	});
	it('user with OWNER role has ADMIN level access', async () => {
		expect(hasMembershipRoleAccess(userWithOwnerRole, 'ADMIN')).toEqual(true);
	});
	it('user with OWNER role has OWNER level access', async () => {
		expect(hasMembershipRoleAccess(userWithOwnerRole, 'OWNER')).toEqual(true);
	});
});
