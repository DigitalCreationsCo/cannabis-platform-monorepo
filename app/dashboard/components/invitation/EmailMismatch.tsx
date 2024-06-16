import { Button, Paragraph } from '@cd/ui-lib';
import { signOut } from 'next-auth/react';
import { useTranslation } from 'next-i18next';

interface EmailMismatchProps {
	email: string;
}

const EmailMismatch = ({ email }: EmailMismatchProps) => {
	const { t } = useTranslation('common');

	return (
		<>
			<Paragraph className="text-sm text-center">
				{t('email-mismatch-error', { email })}
			</Paragraph>
			<Paragraph className="text-sm text-center">
				{t('accept-invitation-email-instruction')}
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

export default EmailMismatch;
