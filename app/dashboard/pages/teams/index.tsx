import { Teams } from '@/components/team';
import type { NextPageWithLayout } from '@/lib/next.types';
import { type GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const AllTeams: NextPageWithLayout = () => {
	return <Teams />;
};

export async function getStaticProps({ locale }: GetServerSidePropsContext) {
	return {
		props: {
			...(locale ? await serverSideTranslations(locale, ['common']) : {}),
		},
	};
}

export default AllTeams;
