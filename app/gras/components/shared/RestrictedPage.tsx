import { TextContent } from '@cd/core-lib';
import {
	Page,
	H1,
	Over21Button,
	FlexBox,
	GrasSignature,
	styles,
	Paragraph,
} from '@cd/ui-lib';
// import TopBar from '@cd/ui-lib/src/components/PlainTopBar';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import logo from 'public/logo.png';
import { type CSSProperties, type PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import ImageGrid from '@/components/shared/ImageGrid/ImageGrid';
import friendsVideo from 'public/Gras-community-clip.mp4';

interface RestrictPageProps {
	// gradient?: 'pink' | 'green' | 'neon';
	// className?: string | string[];
	// style?: CSSProperties;
	showRestrictedContent?: boolean;
}

export default function RestrictPage({
	showRestrictedContent = false,
	...props
}: PropsWithChildren<RestrictPageProps>) {
	const { t } = useTranslation('common');

	const EnterEmail = () => (
		<div className="flex flex-col my-auto">
			<H1 className="w-2/4 lg:w-3/4 mb-4">{`Find cannabis events in your city`}</H1>
			<Over21Button
				redirect={
					typeof window !== 'undefined' ? window.location.pathname : '/'
				}
			/>
		</div>
	);
	const blurRestrictedContent: CSSProperties = {
		maxWidth: '100%',
		maxHeight: '100%',
		overflow: 'hidden',
		content: '""',
		pointerEvents: showRestrictedContent ? 'auto' : 'none',
		filter: showRestrictedContent ? 'none' : 'blur(5px)',
	};

	return (
		<AnimatePresence>
			{!showRestrictedContent && (
				<motion.div
					key="restricted"
					initial={{ scale: 0.5, opacity: 0 }}
					animate={{
						scale: 1,
						opacity: 1,
					}}
					exit={{ scale: 0.5, opacity: 0 }}
					className={twMerge(
						'z-[1000]',
						'lg:border-gray-500 lg:border',
						'm-auto',
						'self-center',
						'fixed',
						'flex flex-col lg:flex-row',
						'h-full lg:h-fit',
						'w-full lg:w-[60%]',
						'lg:top-[10%]',
						'lg:left-[20%]',
						'p-4 lg:p-16',
						'gap-2 lg:gap-4',
						'lg:rounded',
						// 'lg:!py-16 p-0 lg:px-0 pb-0',
						// 'bg-gradient-to-b',
						// 'from-10%',
						// 'from-primary',
						// 'to-secondary',
						'bg-inverse',
						'lg:overflow-hidden'
					)}
				>
					<div className="z-10 h-fit mx-auto lg:my-auto px-4 max-w-sm space-y-4">
						{/* <FlexBox>
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
									<Paragraph>
										{TextContent.info.CANNABIS_DELIVERED_TEXT}
									</Paragraph>
								</Link>
							</FlexBox> */}
						<EnterEmail />
					</div>
					<video
						className={twMerge(
							'absolute lg:relative lg:inline',
							'min-h-full',
							'opacity-35',
							'lg:max-w-md lg:rounded-lg lg:opacity-100',
							'shadow',
							'aspect-video'
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
				</motion.div>
			)}
			<div style={blurRestrictedContent} className="overflow-hidden">
				{props.children}
			</div>
		</AnimatePresence>
	);
}
