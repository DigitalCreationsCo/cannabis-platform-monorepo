import { type Invitation } from '@gras/data-access';
import { Button, Paragraph } from '@gras/ui';
import { signOut } from 'next-auth/react';
import { useTranslation } from 'next-i18next';

interface EmailDomainMismatchProps {
	invitation: Invitation;
	emailDomain: string;
}

const EmailDomainMismatch = ({
	invitation,
	emailDomain,
}: EmailDomainMismatchProps) => {
	const { t } = useTranslation('common');
	const { allowedDomains } = invitation;

	const allowedDomainsString =
		allowedDomains.length === 1
			? `the domain: ${allowedDomains[0]}`
			: `one of the following domains: ${allowedDomains.join(', ')}`;

	return (
		<>
			<Paragraph className="text-sm text-center">
				{t('email-domain-not-allowed', { emailDomain, allowedDomainsString })}
			</Paragraph>
			<Paragraph className="text-sm text-center">
				{t('accept-invitation-email-domain-instruction')}
			</Paragraph>
			<Button
				color="error"
				size="md"
				onClick={() => {
					signOut();
				}}
			>
				{t('sign-out')}
			</Button>
		</>
	);
};

export default EmailDomainMismatch;
