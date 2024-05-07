import { defaultHeaders, type ApiResponse } from '@cd/core-lib';
import { type Dispensary, type Invitation } from '@cd/data-access';
import { Button } from '@cd/ui-lib';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

interface AcceptInvitationProps {
	invitation: Invitation & { team: Dispensary };
}

const AcceptInvitation = ({ invitation }: AcceptInvitationProps) => {
	const router = useRouter();
	const { t } = useTranslation('common');

	const acceptInvitation = async () => {
		const response = await fetch(
			`/api/teams/${invitation.team.slug}/invitations`,
			{
				method: 'PUT',
				headers: defaultHeaders,
				body: JSON.stringify({ inviteToken: invitation.token }),
			},
		);

		if (!response.ok) {
			const result = (await response.json()) as ApiResponse;
			toast.error(result.error.message);
			return;
		}

		router.push('/dashboard');
	};

	return (
		<>
			<h3 className="text-center">{t('accept-invite')}</h3>
			<Button onClick={acceptInvitation} fullWidth color="primary" size="md">
				{t('accept-invitation')}
			</Button>
		</>
	);
};

export default AcceptInvitation;
