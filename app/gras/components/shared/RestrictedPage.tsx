import { Page, H1, Over21Button, Footer } from '@cd/ui-lib';
import TopBar from '@cd/ui-lib/src/components/PlainTopBar';
import { type CSSProperties, type PropsWithChildren } from 'react';
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
	const EnterEmail = () => (
		<div className="flex flex-col px-4">
			<H1 className="w-2/4 lg:w-3/4">{`Find cannabis events in your city`}</H1>
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
				<>
					<Page
						className={twMerge(
							'bg-gradient-to-b',
							'from-10%',
							'from-primary',
							'to-secondary',
							'relative',
							'!pt-0 md:pt-0 px-0 lg:px-0 pb-0',
							'text-light'
							// 'overflow-hidden'
						)}
					>
						<TopBar className="bg-transparent" />
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
			)) ||
				null}
			{(!restrictContent && props.children) || null}
		</>
	);
}
