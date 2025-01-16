import { H1, H2, H3, H4, H5, Over21Button, Paragraph } from '@gras/ui';
import { motion } from 'framer-motion';
import friendsVideo from 'public/Gras-community-clip.mp4';
import { useCallback } from 'react';
import { twMerge } from 'tailwind-merge';

const BlockRestrictedContent = ({
	setShowRestrictedContent,
}: {
	setShowRestrictedContent?: (boolean) => void;
}) => {
	const RestrictedContentModal = useCallback(() => {
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
					'h-full lg:h-[80%]',
					'w-full lg:w-[60%]',
					'lg:top-[10%]',
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
				<div className="z-10 h-fit mx-auto lg:my-auto px-4 md:max-w-md max-w-sm shrink-0 space-y-4">
					<div className="flex flex-col my-auto">
						<H1 className="whitespace-pre-line mb-4">{`Find\ncannabis\nevents in\nyour city`}</H1>
						<H4 className="whitespace-pre-line mb-4">{`SHOWS | GETDOWNS | ART | WEED & more`}</H4>
						<Paragraph>
							By entering your email, you agree you're 21 or older.
						</Paragraph>
						<Over21Button
							redirect={
								typeof window !== 'undefined' ? window.location.pathname : '/'
							}
							onContinue={() => setShowRestrictedContent(true)}
						/>
					</div>
				</div>
				<video
					className={twMerge(
						// 'lg:w-1/2 lg:opacity-100',
						'absolute',
						'min-h-full',
						'w-full',
						'opacity-35',
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
	}, []);

	return <RestrictedContentModal />;
};

export default BlockRestrictedContent;
