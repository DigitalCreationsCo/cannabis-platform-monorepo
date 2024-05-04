import { useDispensary, type TeamFeature } from '@cd/core-lib';
import { LoadingDots } from '@cd/ui-lib';
import { useTranslation } from 'next-i18next';
import { Error } from '@/components/shared';
import { TeamTab } from '@/components/team';
import APIKeys from './APIKeys';

const APIKeysContainer = ({ teamFeatures }: { teamFeatures: TeamFeature }) => {
	const { t } = useTranslation('common');

	const { isLoading, isError, team } = useDispensary();

	if (isLoading) {
		return <LoadingDots />;
	}

	if (isError) {
		return <Error message={isError.message} />;
	}

	if (!team) {
		return <Error message={t('team-not-found')} />;
	}

	return (
		<>
			<TeamTab activeTab="api-keys" team={team} teamFeatures={teamFeatures} />
			<APIKeys team={team} />
		</>
	);
};

export default APIKeysContainer;
