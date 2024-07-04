import { AuthLayout } from '@/components/layouts';
import { DispensaryName, DispensaryAddress } from '@/components/team/create';
import { type NextPageWithLayout } from '@/lib/next.types';
import { Page, FormStepProvider } from '@cd/ui-lib';
import type {
	GetServerSidePropsContext,
	InferGetServerSidePropsType,
} from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import React, { type ReactElement } from 'react';
import DispensaryServices from '@/components/team/create/DispensaryServices';

const CreateDispensary: NextPageWithLayout<
	InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
	const { t } = useTranslation('common');

	const FormStepComponents = [
		// CreateTeam.ProvideDispensaryCode,
		DispensaryName,
		DispensaryAddress,
		DispensaryServices,
		// CreateTeam.DispensaryUserCreate,
		// CreateTeam.ConnectIntegrations,
		// CreateTeam.ProvideStripeAccountId,
		// CreateTeam.DispensaryReview,
		// CreateTeam.DispensarySignUpComplete,
	];

	return (
		// <Page className={twMerge(styles.gradient, 'pb-0', 'md:py-16')}>
		<>
			<Head>
				<NextSeo
					title={t('create-team')}
					description={t('dispensary-description')}
				/>
			</Head>
			{/* <Confetti
				className="h-full w-full"
				numberOfPieces={540}
				run={runConfetti}
				recycle={false}
			/> */}
			{/* <FormCard className={'bg-inverse-soft mx-auto'}> */}
			<FormStepProvider
				formId={t('create-team')}
				FormStepComponents={FormStepComponents}
				// isComplete={() => setRunConfetti(true)}
				stepPosition="bottom"
			/>
			{/* </FormCard> */}
		</>
	);
};

CreateDispensary.getLayout = function getLayout(page: ReactElement) {
	return (
		<Page>
			<AuthLayout>{page}</AuthLayout>;
		</Page>
	);
};

export const getServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	const { locale }: GetServerSidePropsContext = context;

	return {
		props: {
			...(locale ? await serverSideTranslations(locale, ['common']) : {}),
		},
	};
};

export default CreateDispensary;
