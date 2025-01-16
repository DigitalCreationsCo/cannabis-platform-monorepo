import { type DirectorySyncEvent } from '@boxyhq/saml-jackson';
import {
	countStaffMembers,
	removeStaffMember,
	Role,
	addStaffMemberToDispensary,
	getStaffMember,
	upsertStaffMember,
	deleteStaffMember,
	updateStaffMember,
} from '@gras/data-access';
import { clientPromise } from '../db';

// Handle SCIM events
export const handleEvents = async (event: DirectorySyncEvent) => {
	const client = await clientPromise;
	const { event: action, tenant: teamId, data } = event;

	// Currently we only handle the user events
	// TODO: Handle group events
	if (!('email' in data)) {
		return;
	}

	const { email, first_name, last_name, active } = data;
	const name = `${first_name} ${last_name}`;

	// User has been added
	if (action === 'user.created') {
		const staffMember = await upsertStaffMember({
			client,
			where: {
				email,
			},
			update: {
				name,
			},
		});

		await addStaffMemberToDispensary({
			client,
			dispensaryId: teamId,
			staffMemberId: staffMember.id,
			role: Role.MEMBER,
		});
	}

	// User has been updated
	else if (action === 'user.updated') {
		const staffMember = await getStaffMember({ client, where: { email } });

		if (!staffMember) {
			return;
		}

		// Deactivation of staffMember by removing them from the team
		if (active === false) {
			await removeStaffMember({
				client,
				where: { dispensaryId: teamId, staffMemberId: staffMember.id },
			});

			const otherTeamsCount = await countStaffMembers({
				client,
				where: {
					id: staffMember.id,
				},
			});

			if (otherTeamsCount === 0) {
				await deleteStaffMember({
					client,
					where: { email: staffMember.email },
				});
			}

			return;
		}

		await updateStaffMember({
			client,
			where: { email },
			data: {
				name,
			},
		});

		// Reactivation of user by adding them back to the team
		await addStaffMemberToDispensary({
			client,
			dispensaryId: teamId,
			staffMemberId: staffMember.id,
			role: Role.MEMBER,
		});
	}

	// User has been removed
	else if (action === 'user.deleted') {
		const staffMember = await getStaffMember({ client, where: { email } });

		if (!staffMember) {
			return;
		}

		await removeStaffMember({
			client,
			where: { dispensaryId: teamId, staffMemberId: staffMember.id },
		});

		const otherTeamsCount = await countStaffMembers({
			client,
			where: {
				id: staffMember.id,
			},
		});

		if (otherTeamsCount === 0) {
			await deleteStaffMember({ client, where: { email: staffMember.email } });
		}
	}
};
