import { AuthLayout } from '@/components/layouts';
import { Alert } from '@/components/shared';
import { unlockAccount } from '@/lib/accountLock';
import { clientPromise } from '@/lib/db';
import { defaultHeaders } from '@cd/core-lib/types';
import {
	deleteVerificationToken,
	getVerificationToken,
	isVerificationTokenExpired,
	getUser,
} from '@cd/data-access';
import { Button } from '@cd/ui-lib';
import type { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { useState, type ReactElement, useEffect } from 'react';
import type { ComponentStatus } from 'react-daisyui/dist/types';

interface UnlockAccountProps {
	email: string;
	error: string;
	expiredToken: string;
	enableRequestNewToken: boolean;
}

interface Message {
	text: string | null;
	status: ComponentStatus | null;
}

const UnlockAccount = ({
	email,
	error,
	expiredToken,
	enableRequestNewToken,
}: UnlockAccountProps) => {
	const [loading, setLoading] = useState(false);
	const [displayResendLink, setDisplayResendLink] = useState(false);
	const [message, setMessage] = useState<Message>({ text: null, status: null });
	const { t } = useTranslation('common');

	useEffect(() => {
		if (error) {
			setMessage({ text: error, status: 'error' });
		}
	}, [error]);

	useEffect(() => {
		if (enableRequestNewToken) {
			setDisplayResendLink(true);
		}
	}, [enableRequestNewToken]);

	const requestNewLink = async () => {
		try {
			setLoading(true);

			const response = await fetch(`/api/auth/unlock-account`, {
				method: 'POST',
				headers: defaultHeaders,
				body: JSON.stringify({ email, expiredToken }),
			});

			if (!response.ok) {
				const json = await response.json();
				throw new Error(json.error.message);
			}

			setMessage({
				text: t('unlock-account-link-sent'),
				status: 'success',
			});
		} catch (error: any) {
			setMessage({ text: error.message, status: 'error' });
		} finally {
			setLoading(false);
			setDisplayResendLink(false);
		}
	};

	return (
		<div className="rounded p-6 border">
			{message.text && message.status && (
				<Alert status={message.status}>{message.text}</Alert>
			)}

			{displayResendLink && (
				<Button
					className="mt-4 btn btn-outline w-full"
					onClick={requestNewLink}
					loading={loading}
				>
					{t('request-new-link')}
				</Button>
			)}
		</div>
	);
};

UnlockAccount.getLayout = function getLayout(page: ReactElement) {
	return <AuthLayout heading="unlock-account">{page}</AuthLayout>;
};

export const getServerSideProps = async ({
	query,
}: GetServerSidePropsContext) => {
	const { token } = query as { token: string };

	const client = await clientPromise;
	if (!token) {
		return {
			notFound: true,
		};
	}

	const verificationToken = await getVerificationToken({
		client,
		token,
	});

	if (!verificationToken) {
		return {
			props: {
				error:
					'The link is invalid or has already been used. Please contact support if you need further assistance.',
				enableRequestNewToken: false,
				email: null,
				expiredToken: null,
			},
		};
	}

	const user = await getUser({
		client,
		where: { email: verificationToken.identifier },
	});

	if (!user) {
		return {
			notFound: true,
		};
	}

	if (isVerificationTokenExpired(verificationToken)) {
		return {
			props: {
				error:
					'The link has expired. Please request a new one if you still need to unlock your account.',
				enableRequestNewToken: true,
				email: verificationToken.identifier,
				expiredToken: verificationToken.token,
			},
		};
	}

	await Promise.allSettled([
		unlockAccount(user),
		deleteVerificationToken({ client, token: verificationToken.token }),
	]);

	return {
		redirect: {
			destination: '/auth/login?success=account-unlocked',
			permanent: false,
		},
	};
};

export default UnlockAccount;
