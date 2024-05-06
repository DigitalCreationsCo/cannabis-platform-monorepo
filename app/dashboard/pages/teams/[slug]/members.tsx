import { type TeamFeature, useDispensary } from '@cd/core-lib';
import { LoadingPage } from '@cd/ui-lib';
import { type GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { PendingInvitations } from '@/components/invitation';
import { Error, Loading } from '@/components/shared';
import { Members, TeamTab } from '@/components/team';
import env from '@/lib/env';

const TeamMembers = ({ teamFeatures }: { teamFeatures: TeamFeature }) => {
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
			<TeamTab activeTab="members" team={team} teamFeatures={teamFeatures} />
			<div className="space-y-6">
				<Members team={team} />
				<PendingInvitations team={team} />
			</div>
		</>
	);
};

export async function getServerSideProps({
	locale,
}: GetServerSidePropsContext) {
	return {
		props: {
			...(locale ? await serverSideTranslations(locale, ['common']) : {}),
			teamFeatures: env.teamFeatures,
		},
	};
}

export default TeamMembers;
