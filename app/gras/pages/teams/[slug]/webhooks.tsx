import { type TeamFeature, useDispensary } from '@cd/core-lib';
import { LoadingPage } from '@cd/ui-lib';
import { type GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Error, Loading } from '@/components/shared';
import { TeamTab } from '@/components/team';
import { Webhooks } from '@/components/webhook';
import env from '@/lib/env';

const WebhookList = ({ teamFeatures }: { teamFeatures: TeamFeature }) => {
	const { t } = useTranslation('common');
	const { isLoading, isError, team } = useDispensary();

	if (isLoading) {
		return <LoadingPage />;
	}

	if (isError) {
		return <Error message={isError.message} />;
	}

	if (!team) {
		return <Error message={t('team-not-found')} />;
	}

	return (
		<>
			<TeamTab activeTab="webhooks" team={team} teamFeatures={teamFeatures} />
			<Webhooks team={team} />
		</>
	);
};

export async function getServerSideProps({
	locale,
}: GetServerSidePropsContext) {
	if (!env.teamFeatures.webhook) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			...(locale ? await serverSideTranslations(locale, ['common']) : {}),
			teamFeatures: env.teamFeatures,
		},
	};
}

export default WebhookList;
