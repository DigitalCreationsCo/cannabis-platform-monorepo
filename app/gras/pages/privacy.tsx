import { TopBar } from '@/components/layouts';
import { type NextPageWithLayout } from '@/lib/next.types';
// eslint-disable-next-line import/no-named-as-default
import seoConfig from '@/lib/seo.config';
import { TextContent } from '@cd/core-lib/constants';
import { Page, Footer } from '@cd/ui-lib';
import { type GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
import { type ReactElement } from 'react';
import PrivacyPolicy from '@/components/help-topics/legal/PrivacyPolicy';

const PrivacyPage: NextPageWithLayout = () => {
	return (
		<>
			<NextSeo
				{...seoConfig}
				title={'Our Privacy Policy | Gras.live'}
				description={TextContent.info.ABOUT_GRAS}
			/>
			<Page className="!pt-0 md:pt-0 px-0 lg:px-0 md:py-8 pb-0 bg-secondary text-light min-h-fit">
				<TopBar SearchComponent={null} />
				<PrivacyPolicy />
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

PrivacyPage.getLayout = function getLayout(page: ReactElement) {
	return (
		<>
			{page}
			<Footer />
		</>
	);
};

export default PrivacyPage;
