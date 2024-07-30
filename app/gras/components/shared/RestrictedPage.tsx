import {
	Page,
	H1,
	Over21Button,
	FlexBox,
	GrasSignature,
	styles,
} from '@cd/ui-lib';
// import TopBar from '@cd/ui-lib/src/components/PlainTopBar';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import logo from 'public/logo.png';
import { type PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import ImageGrid from '@/components/shared/ImageGrid/ImageGrid';
import friendsVideo from 'public/Gras-community-clip.mp4';

interface RestrictPageProps {
	// gradient?: 'pink' | 'green' | 'neon';
	// className?: string | string[];
	// style?: CSSProperties;
	restrictContent?: boolean;
}

export default function RestrictPage({
	restrictContent = true,
	...props
}: PropsWithChildren<RestrictPageProps>) {
	const { t } = useTranslation('common');

	const EnterEmail = () => (
		<div className="flex flex-col my-auto">
			<H1 className="w-2/4 lg:w-3/4 mb-4">{`Find cannabis events in your city`}</H1>
			{/* redirect to the same page */}
			<Over21Button
				redirect={
					typeof window !== 'undefined' ? window.location.pathname : '/'
				}
			/>
		</div>
	);

	return (
		<>
			{(restrictContent && (
				<Page
					className={twMerge(
						'relative',
						'lg:!pt-16 p-0 lg:px-0 pb-0',
						'bg-gradient-to-b',
						'from-10%',
						'from-primary',
						'to-secondary',
						'text-light',
						'h-screen',
						'lg:overflow-hidden'
					)}
				>
					{/* <TopBar className="bg-transparent" /> */}
					<div className="pt-2 hidden lg:inline">
						<ImageGrid>
							<>
								<video
									className={twMerge(
										'col-span-2',
										'w-full h-full opacity-25',
										'lg:rounded lg:opacity-100',
										'shadow',
										'aspect-video'
										// 'rounded max-w-xs',
										// 'rounded object-cover shrink-0 min-w-full bg-green-500/75'
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
								<div className="h-fit my-auto px-4 space-y-4">
									<FlexBox>
										<Link
											href={'/'}
											className={twMerge(
												'z-50 flex flex-row gap-x-4 items-center',
												styles.shadow.logoShadow
											)}
										>
											<GrasSignature className="text-inverse py-0 mb-0 leading-3">
												{t('gras')}
											</GrasSignature>
											<Image
												alt="Gras"
												className="w-[36px] bg-inverse rounded-full"
												src={logo}
												quality={25}
											/>
											{/* <Paragraph
						className={twMerge(styles.TOPBAR.tagline, 'text-inverse-soft')}
					>
						{TextContent.info.CANNABIS_DELIVERED_TEXT}
					</Paragraph> */}
										</Link>
									</FlexBox>
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
						<div className="z-10 mx-auto px-4 mt-2 md:mt-20 items-center max-w-md space-y-4">
							<FlexBox>
								<Link
									href={'/'}
									className={twMerge(
										'z-50 flex flex-row gap-x-4 items-center',
										styles.shadow.logoShadow
									)}
								>
									<GrasSignature className="text-inverse py-0 mb-0 leading-3">
										{t('gras')}
									</GrasSignature>
									<Image
										alt="Gras"
										className="w-[36px] bg-inverse rounded-full"
										src={logo}
										quality={25}
									/>
									{/* <Paragraph
						className={twMerge(styles.TOPBAR.tagline, 'text-inverse-soft')}
					>
						{TextContent.info.CANNABIS_DELIVERED_TEXT}
					</Paragraph> */}
								</Link>
							</FlexBox>
							<EnterEmail />
						</div>
					</div>
				</Page>
			)) ||
				null}
			{(!restrictContent && props.children) || null}
		</>
	);
}
