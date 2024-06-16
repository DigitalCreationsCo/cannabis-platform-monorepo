import { type DirectorySyncEvent } from '@boxyhq/saml-jackson';
import {
	countStaffMembers,
	deleteUser,
	getUser,
	updateUser,
	upsertUser,
	addStaffMember,
	removeStaffMember,
	Role,
} from '@cd/data-access';
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
		const user = await upsertUser({
			client,
			where: {
				email,
			},
			update: {
				name,
			},
		});

		await addStaffMember({
			client,
			dispensary: teamId,
			userId: user.id,
			role: Role.MEMBER,
		});
	}

	// User has been updated
	else if (action === 'user.updated') {
		const user = await getUser({ client, where: { email } });

		if (!user) {
			return;
		}

		// Deactivation of user by removing them from the team
		if (active === false) {
			await removeStaffMember({
				client,
				where: { dispensaryId: teamId, userId: user.id },
			});

			const otherTeamsCount = await countStaffMembers({
				client,
				where: {
					userId: user.id,
				},
			});

			if (otherTeamsCount === 0) {
				await deleteUser({ client, where: { email: user.email } });
			}

			return;
		}

		await updateUser({
			client,
			where: { email },
			data: {
				name,
			},
		});

		// Reactivation of user by adding them back to the team
		await addStaffMember({
			client,
			dispensary: teamId,
			userId: user.id,
			role: Role.MEMBER,
		});
	}

	// User has been removed
	else if (action === 'user.deleted') {
		const user = await getUser({ client, where: { email } });

		if (!user) {
			return;
		}

		await removeStaffMember({
			client,
			where: { dispensaryId: teamId, userId: user.id },
		});

		const otherTeamsCount = await countStaffMembers({
			client,
			where: {
				userId: user.id,
			},
		});

		if (otherTeamsCount === 0) {
			await deleteUser({ client, where: { email: user.email } });
		}
	}
};
