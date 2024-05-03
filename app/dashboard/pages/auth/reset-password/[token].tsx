import type { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { type ReactElement } from 'react';
import { ResetPasswordForm } from '@/components/auth';
import { AuthLayout } from '@/components/layouts';
import type { NextPageWithLayout } from '@/lib/next.types';

const ResetPasswordPage: NextPageWithLayout = () => {
	return <ResetPasswordForm />;
};

ResetPasswordPage.getLayout = function getLayout(page: ReactElement) {
	return (
		<AuthLayout heading="reset-password" description="enter-new-password">
			{page}
		</AuthLayout>
	);
};

export const getServerSideProps = async (
	context: GetServerSidePropsContext,
) => {
	const { locale }: GetServerSidePropsContext = context;

	return {
		props: {
			...(locale ? await serverSideTranslations(locale, ['common']) : {}),
		},
	};
};

export default ResetPasswordPage;
