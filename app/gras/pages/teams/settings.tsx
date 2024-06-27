import { type TeamFeature, useDispensary } from '@cd/core-lib';
import { LoadingPage } from '@cd/ui-lib';
import type { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Error, Loading } from '@/components/shared';
import { AccessControl } from '@/components/shared/AccessControl';
import { RemoveTeam, TeamSettings, TeamTab } from '@/components/team';
import env from '@/lib/env';

const Settings = ({ teamFeatures }: { teamFeatures: TeamFeature }) => {
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
			<TeamTab activeTab="settings" team={team} teamFeatures={teamFeatures} />
			<div className="space-y-6">
				<TeamSettings team={team} />
				<AccessControl resource="team" actions={['delete']}>
					<RemoveTeam team={team} allowDelete={teamFeatures.deleteTeam} />
				</AccessControl>
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

export default Settings;
