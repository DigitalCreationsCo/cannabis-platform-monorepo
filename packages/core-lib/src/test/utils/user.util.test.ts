import { UserWithDetails } from '@cd/data-access';
import { 
	// hasMembershipRoleAccess, 
	isLegalAgeAndVerified } from '../..';
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

	// it('user with MEMBER role has MEMBER level access', async () => {
	// 	expect(hasMembershipRoleAccess(userWithMemberRole, 'MEMBER')).toStrictEqual(
	// 		true,
	// 	);
	// });
	// it('user with MEMBER role does not have ADMIN level access', async () => {
	// 	expect(hasMembershipRoleAccess(userWithMemberRole, 'ADMIN')).toStrictEqual(
	// 		false,
	// 	);
	// });
	// it('user with MEMBER role does not have OWNER level access', async () => {
	// 	expect(hasMembershipRoleAccess(userWithMemberRole, 'OWNER')).toStrictEqual(
	// 		false,
	// 	);
	// });
	// it('user with ADMIN role has MEMBER level access', async () => {
	// 	expect(hasMembershipRoleAccess(userWithAdminRole, 'MEMBER')).toStrictEqual(
	// 		true,
	// 	);
	// });
	// it('user with ADMIN role has ADMIN level access', async () => {
	// 	expect(hasMembershipRoleAccess(userWithAdminRole, 'ADMIN')).toStrictEqual(
	// 		true,
	// 	);
	// });
	// it('user with ADMIN role does not have OWNER level access', async () => {
	// 	expect(hasMembershipRoleAccess(userWithAdminRole, 'OWNER')).toStrictEqual(
	// 		false,
	// 	);
	// });
	// it('user with OWNER role has MEMBER level access', async () => {
	// 	expect(hasMembershipRoleAccess(userWithOwnerRole, 'MEMBER')).toStrictEqual(
	// 		true,
	// 	);
	// });
	// it('user with OWNER role has ADMIN level access', async () => {
	// 	expect(hasMembershipRoleAccess(userWithOwnerRole, 'ADMIN')).toStrictEqual(
	// 		true,
	// 	);
	// });
	// it('user with OWNER role has OWNER level access', async () => {
	// 	expect(hasMembershipRoleAccess(userWithOwnerRole, 'OWNER')).toStrictEqual(
	// 		true,
	// 	);
	// });
});

describe('User is_legal_ageAndVerified', () => {
	const userIsLegalAndVerified = {
		firstName: 'Doug',
		is_legal_age: true,
		id_verified: true,
	} as UserWithDetails;

	const userIsNotLegalAndVerified = {
		firstName: 'Doug',
		is_legal_age: false,
		id_verified: true,
	} as UserWithDetails;

	const userIsNotLegalAndNotid_verified = {
		firstName: 'Doug',
		is_legal_age: false,
		id_verified: false,
	} as UserWithDetails;

	it('userIsLegalAndVerified returns true', async () => {
		expect(isLegalAgeAndVerified(userIsLegalAndVerified)).toStrictEqual({
			isLegal: true,
			verified: true,
		});
	});

	it('userIsNotLegalAndVerified returns false', async () => {
		expect(isLegalAgeAndVerified(userIsNotLegalAndVerified)).toStrictEqual(
			false,
		);
	});

	it('userIsNotLegalAndNotid_verified returns false', async () => {
		expect(isLegalAgeAndVerified(userIsNotLegalAndNotid_verified)).toStrictEqual(
			false,
		);
	});
});
