import {
	Button,
	Center,
	FlexBox,
	H1,
	Page,
	SignInButton,
	Footer,
	Benefit,
} from '@cd/ui-lib';
import { unlockYourGrowth } from '@cd/ui-lib/src/components/landing/benefits/benefit-data';
import { type GetServerSidePropsContext } from 'next';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { type ReactElement, type PropsWithChildren } from 'react';
import DashboardTopBar from '@/components/layouts/DashboardTopBar';
import env from '@/lib/env';
import backdrop from '../public/marijuana-backdrop.png';

export default function DashboardHome() {
	const router = useRouter();
	const { t } = useTranslation('common');
	const { status } = useSession();

	const redirectUrl = env.redirectIfAuthenticated;

	if (status === 'authenticated') {
		router.push(redirectUrl);
	}

	return (
		<>
			<Page className="m-0 flex grow border-b bg-transparent p-0 md:p-0 lg:p-0 h-[666px]">
				<ImageBackDrop src={backdrop}>
					<DashboardTopBar />
					<Center className="gap-8">
						<H1
							color="light"
							className="tracking-normal text-5xl md:text-5xl lg:text-6xl"
						>
							{t('dispensary-success-services')}
						</H1>
						<FlexBox className="lg:flex-row gap-x-24 gap-y-8">
							<div className="flex flex-col gap-y-6">
								{unlockYourGrowth.bullets.map((item, index) => (
									<Benefit
										key={index}
										title={item.title || ''}
										icon={item.icon}
										description={item.description}
										valueColor={'text-light'}
									/>
								))}
							</div>
							<FlexBox className="items-center space-y-6 mx-auto md:pt-8">
								<SignInButton size="lg" bg="primary" hover="primary-light" />

								<Link href="/auth/join">
									<Button
										type="button"
										size="lg"
										bg="primary"
										transparent
										className="hover:bg-primary-light p-4"
									>
										{`Create a business account`}
									</Button>
								</Link>
							</FlexBox>
						</FlexBox>
					</Center>
				</ImageBackDrop>
			</Page>
		</>
	);
}

const ImageBackDrop = ({
	src,
	children,
}: { src: string | StaticImageData } & PropsWithChildren) => {
	return (
		<div className="relative flex flex-col w-full h-full grow">
			<Image
				src={src}
				alt=""
				style={{
					position: 'absolute',
					width: '100%',
					height: '100%',
					zIndex: -1,
					objectFit: 'cover',
					objectPosition: '80% 40%',
				}}
				priority
				quality={100}
			/>
			<div
				className="flex h-full grow"
				style={{
					zIndex: -1,
					backgroundColor: 'rgba(155,155,125,.25)',
					position: 'absolute',
					height: '100%',
					width: '100%',
					left: '0',
					top: '0',
				}}
			></div>
			{children}
		</div>
	);
};

// DashboardHome.getLayoutContext = (): LayoutContextProps => ({
// 	showHeader: false,
// 	showTopBar: true,
// 	showSideNav: false,
// });

export async function getStaticProps({ locale }: GetServerSidePropsContext) {
	return {
		props: {
			...(locale ? await serverSideTranslations(locale, ['common']) : {}),
		},
	};
}

DashboardHome.getLayout = function getLayout(page: ReactElement) {
	return (
		<>
			{page}
			<Footer />
		</>
	);
};
