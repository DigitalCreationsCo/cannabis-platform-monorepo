import { useDispensaries } from '@cd/core-lib';
import { LoadingDots } from '@cd/ui-lib';
import { type GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import type { NextPageWithLayout } from '@/lib/next.types';

const Dashboard: NextPageWithLayout = () => {
	const router = useRouter();
	const { dispensaries, isLoading } = useDispensaries();

	useEffect(() => {
		console.trace('1dispensaries', dispensaries);
		console.trace('isLoading', isLoading);

		if (isLoading || !dispensaries) {
			console.info('Loading dispensaries');
			console.info('dispensaries', dispensaries);
			return;
		}

		console.info('Checking dispensaries');
		console.info('dispensaries', dispensaries);
		if (dispensaries.length > 0) {
			console.info('Redirecting to team settings');
			router.push(`/teams/${dispensaries[0].slug}/settings`);
		} else {
			console.info('Redirecting to new team');
			router.push('teams?newTeam=true');
		}
	}, [isLoading, dispensaries]);

	return <LoadingDots />;
};

export async function getStaticProps({ locale }: GetServerSidePropsContext) {
	return {
		props: {
			...(locale ? await serverSideTranslations(locale, ['common']) : {}),
		},
	};
}

export default Dashboard;
