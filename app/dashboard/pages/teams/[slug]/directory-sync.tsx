import { DirectoriesWrapper } from '@boxyhq/react-ui/dsync';
import { type TeamFeature, useDispensary } from '@cd/core-lib';
import { LoadingPage } from '@cd/ui-lib';
import { type GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { toast } from 'react-hot-toast';
import { Error, Loading } from '@/components/shared';
import { BOXYHQ_UI_CSS } from '@/components/styles';
import { TeamTab } from '@/components/team';
import env from '@/lib/env';

const DirectorySync = ({ teamFeatures }: { teamFeatures: TeamFeature }) => {
	const { isLoading, isError, team } = useDispensary();
	const { t } = useTranslation('common');

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
			<TeamTab
				activeTab="directory-sync"
				team={team}
				teamFeatures={teamFeatures}
			/>
			<DirectoriesWrapper
				classNames={BOXYHQ_UI_CSS}
				componentProps={{
					directoryList: {
						cols: ['name', 'type', 'status', 'actions'],
						hideViewAction: true,
					},
					createDirectory: {
						excludeFields: [
							'product',
							'tenant',
							'webhook_secret',
							'webhook_url',
							'log_webhook_events',
						],
						disableGoogleProvider: true,
					},
					editDirectory: {
						excludeFields: [
							'webhook_url',
							'webhook_secret',
							'log_webhook_events',
						],
					},
				}}
				urls={{
					get: `/api/dispensaries/${team.slug}/dsync`,
					post: `/api/dispensaries/${team.slug}/dsync`,
					patch: `/api/dispensaries/${team.slug}/dsync`,
					delete: `/api/dispensaries/${team.slug}/dsync`,
				}}
				successCallback={({ operation }) => {
					if (operation === 'CREATE') {
						toast.success(`Connection created successfully.`);
					} else if (operation === 'UPDATE') {
						toast.success(`Connection updated successfully.`);
					} else if (operation === 'DELETE') {
						toast.success(`Connection deleted successfully.`);
					} else if (operation === 'COPY') {
						toast.success(`Contents copied to clipboard`);
					}
				}}
				errorCallback={(errMessage) => toast.error(errMessage)}
			/>
		</>
	);
};

export async function getServerSideProps({
	locale,
}: GetServerSidePropsContext) {
	if (!env.teamFeatures.dsync) {
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

export default DirectorySync;
