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
		if (isLoading || !dispensaries) {
			return;
		}

		if (dispensaries.length > 0) {
			router.push(`/teams/${dispensaries[0]!.slug}/home`);
		} else {
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
