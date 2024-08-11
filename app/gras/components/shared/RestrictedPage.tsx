import { H1, Over21Button, Paragraph, useScrollLock } from '@cd/ui-lib';
import { motion, AnimatePresence } from 'framer-motion';
import { type CSSProperties, type PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import friendsVideo from 'public/Gras-community-clip.mp4';

interface RestrictPageProps {
	showRestrictedContent?: boolean;
}

export default function RestrictPage({
	showRestrictedContent = false,
	...props
}: PropsWithChildren<RestrictPageProps>) {
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
			{!showRestrictedContent && <RestrictedContentModal />}
			<div style={blurRestrictedContent} className="overflow-hidden">
				{props.children}
			</div>
		</AnimatePresence>
	);
}

const RestrictedContentModal = () => {
	useScrollLock();
	return (
		<motion.div
			id="restricted"
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
				'lg:top-[20%]',
				'lg:left-[20%]',
				'p-12',
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
			<div className="z-10 h-fit mx-auto lg:my-auto px-4 md:w-1/2 max-w-sm shrink-0 space-y-4">
				<div className="flex flex-col my-auto">
					<H1 className="w-3/4 mb-4">{`Find cannabis events in your city`}</H1>
					<Paragraph>
						By entering your email, you agree you're over 21.
					</Paragraph>
					<Over21Button
						redirect={
							typeof window !== 'undefined' ? window.location.pathname : '/'
						}
					/>
				</div>
			</div>
			<video
				className={twMerge(
					'absolute lg:relative',
					'min-h-full',
					'opacity-35',
					'lg:w-1/2 lg:opacity-100',
					'aspect-video',
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
		</motion.div>
	);
};
