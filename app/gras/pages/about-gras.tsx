import { type NextPageWithLayout } from '@/lib/next.types';
import SEOMetaTags from '@/lib/SEOMetaTags';
import { TextContent } from '@cd/core-lib';
import { Page, Footer } from '@cd/ui-lib';
import { type GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { type ReactElement } from 'react';
import AboutGras from '@/components/help-topics/AboutGras';

const AboutPage: NextPageWithLayout = () => {
	return (
		<>
			<SEOMetaTags
				title={'About Gras'}
				description={TextContent.info.ABOUT_GRAS}
			/>
			<Page className="!pt-0 md:pt-0 px-0 lg:px-0 md:!py-8 pb-0 bg-secondary text-light">
				<AboutGras />
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

AboutPage.getLayout = function getLayout(page: ReactElement) {
	return (
		<>
			{page}
			<Footer />
		</>
	);
};

export default AboutPage;
