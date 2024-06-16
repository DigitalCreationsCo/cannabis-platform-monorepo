import { ConnectionsWrapper } from '@boxyhq/react-ui/sso';
import { useDispensary } from '@cd/core-lib';
import { LoadingPage } from '@cd/ui-lib';
import { type GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import toast from 'react-hot-toast';
import { Error } from '@/components/shared';
import { BOXYHQ_UI_CSS } from '@/components/styles';
import { TeamTab } from '@/components/team';
import env from '@/lib/env';

const TeamSSO = ({ teamFeatures, SPConfigURL }: any) => {
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
			<TeamTab activeTab="sso" team={team} teamFeatures={teamFeatures} />
			<ConnectionsWrapper
				urls={{
					spMetadata: SPConfigURL,
					get: `/api/dispensaries/${team.slug}/sso`,
					post: `/api/dispensaries/${team.slug}/sso`,
					patch: `/api/dispensaries/${team.slug}/sso`,
					delete: `/api/dispensaries/${team.slug}/sso`,
				}}
				successCallback={({
					operation,
					connectionIsSAML,
					connectionIsOIDC,
				}) => {
					const ssoType = connectionIsSAML
						? 'SAML'
						: connectionIsOIDC
							? 'OIDC'
							: '';
					if (operation === 'CREATE') {
						toast.success(`${ssoType} connection created successfully.`);
					} else if (operation === 'UPDATE') {
						toast.success(`${ssoType} connection updated successfully.`);
					} else if (operation === 'DELETE') {
						toast.success(`${ssoType} connection deleted successfully.`);
					} else if (operation === 'COPY') {
						toast.success(`Contents copied to clipboard`);
					}
				}}
				errorCallback={(errMessage) => toast.error(errMessage)}
				classNames={BOXYHQ_UI_CSS}
				componentProps={{
					connectionList: {
						cols: ['provider', 'type', 'status', 'actions'],
					},
					editOIDCConnection: { displayInfo: false },
					editSAMLConnection: { displayInfo: false },
				}}
			/>
		</>
	);
};

export async function getServerSideProps({
	locale,
}: GetServerSidePropsContext) {
	if (!env.teamFeatures.sso) {
		return {
			notFound: true,
		};
	}

	const SPConfigURL = env.jackson.selfHosted
		? `${env.jackson.url}/well-known/saml-configuration`
		: '/well-known/saml-configuration';

	return {
		props: {
			...(locale ? await serverSideTranslations(locale, ['common']) : {}),
			teamFeatures: env.teamFeatures,
			SPConfigURL,
		},
	};
}

export default TeamSSO;
