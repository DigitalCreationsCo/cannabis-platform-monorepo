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

// Handle SCIM events
export const handleEvents = async (event: DirectorySyncEvent) => {
  const { event: action, tenant: teamId, data } = event;

  // Currently we only handle the user events
  // TODO: Handle group events
  if (!('email' in data)) {
    return;
  }

  const { email, first_name, last_name, active, id } = data;
  const name = `${first_name} ${last_name}`;

  // User has been added
  if (action === 'user.created') {
    const user = await upsertUser({
      id,
      update: {
        name,
      },
    });

    await addStaffMember(teamId, user.id, Role.MEMBER);
  }

  // User has been updated
  else if (action === 'user.updated') {
    const user = await getUser({ email });

    if (!user) {
      return;
    }

    // Deactivation of user by removing them from the team
    if (active === false) {
      await removeStaffMember(teamId, user.id);

      const otherTeamsCount = await countStaffMembers({
        where: {
          userId: user.id,
        },
      });

      if (otherTeamsCount === 0) {
        await deleteUser({ email: user.email });
      }

      return;
    }

    await updateUser({
      id: user.id,
      data: {
        name,
      },
    });

    // Reactivation of user by adding them back to the team
    await addStaffMember(teamId, user.id, Role.MEMBER);
  }

  // User has been removed
  else if (action === 'user.deleted') {
    const user = await getUser({ email });

    if (!user) {
      return;
    }

    await removeStaffMember(teamId, user.id);

    const otherTeamsCount = await countStaffMembers({
      where: {
        userId: user.id,
      },
    });

    if (otherTeamsCount === 0) {
      await deleteUser({ email: user.email });
    }
  }
};
