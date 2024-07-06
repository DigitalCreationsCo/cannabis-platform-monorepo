import env from '@/lib/env';
import { type NextPageWithLayout } from '@/lib/next.types';
import SEOMetaTags from '@/lib/SEOMetaTags';
import { TextContent } from '@cd/core-lib';
import {
	FlexBox,
	Paragraph,
	GrasSignature,
	styles,
	Button,
	Page,
	H1,
	Footer,
	Over21Button,
} from '@cd/ui-lib';
import { type GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import Link from 'next/link';
import { type ReactElement } from 'react';
import { twMerge } from 'tailwind-merge';
import ImageGrid from '@/components/shared/ImageGrid/ImageGrid';
import friendsVideo from '../public/Gras-community-clip.mp4';
import logo from '../public/logo.png';

const Home: NextPageWithLayout = () => {
	const { t } = useTranslation('common');

	const EnterEmail = () => (
		<div className="flex flex-col">
			<H1 className="text-center !text-5xl">{`Find cannabis events in your city`}</H1>
			<Over21Button />
		</div>
	);
	return (
		<>
			<SEOMetaTags />
			<Page
				className={twMerge(
					gradient,
					'relative',
					'!pt-0 md:pt-0 px-0 lg:px-0 pb-0',
					'text-light'
					// 'overflow-hidden'
				)}
			>
				<div className={twMerge(styles.TOPBAR.topbar, 'bg-transparent')}>
					<div>
						<FlexBox className="flex-row items-center pt-2">
							<Link href={'/'} className="z-50">
								<GrasSignature className="text-inverse pt-1 pb-0 mb-0 leading-3">
									{t('gras')}
								</GrasSignature>
							</Link>
							<Link
								href={'/'}
								className="p-0.25 ml-2 bg-inverse w-fit rounded-full"
							>
								<Image
									alt="Gras"
									className="w-[36px]"
									src={logo}
									quality={25}
								/>
							</Link>
						</FlexBox>
						<Link href={'/'}>
							<Paragraph
								className={twMerge(styles.TOPBAR.tagline, 'text-inverse-soft')}
							>
								{TextContent.info.CANNABIS_DELIVERED_TEXT}
							</Paragraph>
						</Link>
					</div>
					<div className="flex-none">
						<ul className="flex items-center gap-2 sm:gap-4 md:pr-2">
							<li>
								<Link href="/auth/login">
									<Button
										className={twMerge(
											styles.BUTTON.highlight,
											'hover:border-light text-light'
										)}
										size="sm"
										bg="transparent"
										hover="transparent"
									>
										{t('sign-in')}
									</Button>
								</Link>
							</li>
						</ul>
					</div>
				</div>

				<div className="pt-4">
					<ImageGrid>
						<>
							<video
								className={twMerge(
									'col-span-2',
									'w-full h-full opacity-25',
									'lg:rounded lg:opacity-100',
									'shadow'
								)}
								style={{
									objectFit: 'cover',
									objectPosition: '40% 40%',
									left: '0',
									top: '0',
								}}
								src={friendsVideo}
								autoPlay
								loop
								muted
								preload="auto"
								playsInline
								poster={'/public/Gras-community.png'}
							/>
							<div>
								<EnterEmail />
							</div>
						</>
					</ImageGrid>
				</div>

				<div className="lg:hidden flex flex-row w-full h-[550px] min-h-full grow col-span-3">
					<video
						className={twMerge(
							'absolute flex-1 w-full opacity-25',
							'lg:max-w-lg lg:rounded-lg lg:opacity-100',
							'min-h-full',
							'shadow'
						)}
						style={{
							aspectRatio: 'auto',
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							objectPosition: '40% 40%',
							left: '0',
							top: '0',
						}}
						src={friendsVideo}
						autoPlay
						loop
						muted
					/>
					<div className="z-10 mx-auto mt-20 items-center max-w-md">
						<EnterEmail />
					</div>
				</div>
			</Page>
		</>
	);
};

const gradient = [
	'bg-gradient-to-b',
	'from-10%',
	'from-secondary',
	'to-secondary',
];

export const getServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	// Redirect to login page if landing page is disabled
	if (env.hideLandingPage) {
		return {
			redirect: {
				destination: '/auth/login',
				permanent: true,
			},
		};
	}

	const { locale } = context;

	return {
		props: {
			...(locale ? await serverSideTranslations(locale, ['common']) : {}),
		},
	};
};

Home.getLayout = function getLayout(page: ReactElement) {
	return (
		<>
			{page}
			<Footer />
		</>
	);
};

export default Home;
