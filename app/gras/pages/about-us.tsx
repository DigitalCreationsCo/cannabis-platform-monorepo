import { type NextPageWithLayout } from '@/lib/next.types';
import { keywords, TextContent } from '@cd/core-lib';
import { Page, Footer } from '@cd/ui-lib';
import { type GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
import { type ReactElement } from 'react';
import AboutGras from '@/components/help-topics/AboutGras';
import seoConfig from '@/lib/seo.config';

const AboutPage: NextPageWithLayout = () => {
	return (
		<>
			<NextSeo
				title={'About Gras'}
				description={TextContent.info.ABOUT_GRAS}
				openGraph={seoConfig.openGraph}
				twitter={seoConfig.twitter}
				additionalLinkTags={seoConfig.additionalLinkTags}
				additionalMetaTags={[
					...seoConfig.additionalMetaTags,
					{
						name: 'keywords',
						content: [...keywords['business'], 'about', 'gras']
							.concat(
								TextContent.info.ABOUT_GRAS.replace(/[\s.,]/g, ',').split(',')
							)
							.join(', '),
					},
				]}
			/>
			<Page className="!pt-0 md:pt-0 px-0 lg:px-0 md:!py-8 pb-0 bg-secondary text-light min-h-fit">
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
