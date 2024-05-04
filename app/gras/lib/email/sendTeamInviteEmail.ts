import { Invitation, Dispensary } from '@cd/data-access';
import { sendEmail } from './sendEmail';
import { TeamInviteEmail } from '@/components/emailTemplates';
import { render } from '@react-email/components';
import env from '../env';
import app from '../app';

export const sendTeamInviteEmail = async (
  team: Dispensary,
  invitation: Invitation
) => {
  if (!invitation.email) {
    return;
  }

  const subject = `You've been invited to join ${team.name} on ${app.name}`;
  const invitationLink = `${env.appUrl}/invitations/${invitation.token}`;

  const html = render(TeamInviteEmail({ invitationLink, team, subject }));

  await sendEmail({
    to: invitation.email,
    subject,
    html,
  });
};
