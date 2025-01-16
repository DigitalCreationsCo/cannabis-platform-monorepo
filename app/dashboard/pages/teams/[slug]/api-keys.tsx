import { type TeamFeature } from '@gras/core';
import { type GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import APIKeysContainer from '@/components/apiKey/APIKeysContainer';
import env from '@/lib/env';

const APIKeys = ({ teamFeatures }: { teamFeatures: TeamFeature }) => {
	return <APIKeysContainer teamFeatures={teamFeatures} />;
};

export async function getServerSideProps({
	locale,
}: GetServerSidePropsContext) {
	if (!env.teamFeatures.apiKey) {
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

export default APIKeys;
