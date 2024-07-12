import { TopBar } from '@/components/layouts';
import { type NextPageWithLayout } from '@/lib/next.types';
import SEOMetaTags from '@/lib/SEOMetaTags';
import { Page, Footer } from '@cd/ui-lib';
import { type GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { type ReactElement } from 'react';
import UserTermsAndConditions from '@/components/help-topics/legal/UserTermsAndConditions';

const TermsPage: NextPageWithLayout = () => {
	return (
		<>
			<SEOMetaTags title={'Terms of Service | Gras.live'} />
			<Page className="!pt-0 md:pt-0 px-0 lg:px-0 md:py-8 pb-0 bg-secondary text-light">
				<TopBar SearchComponent={null} />
				<UserTermsAndConditions />
			</Page>
		</>
	);
};

export const getServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	const { locale } = context;
	return {
		props: {
			...(locale ? await serverSideTranslations(locale, ['common']) : {}),
		},
	};
};

TermsPage.getLayout = function getLayout(page: ReactElement) {
	return (
		<>
			{page}
			<Footer />
		</>
	);
};

export default TermsPage;
