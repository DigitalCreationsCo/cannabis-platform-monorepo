import { useScrollLock } from '@gras/ui';
import { AnimatePresence } from 'framer-motion';
import { useEffect, type CSSProperties, type PropsWithChildren } from 'react';
import BlockRestrictedContent from '@/components/shared/RestrictedContentModal';

interface RestrictPageProps {
	showContent?: boolean;
	setShowRestrictedContent?: (boolean) => void;
}

export default function RestrictPage({
	showContent = true,
	setShowRestrictedContent,
	...props
}: PropsWithChildren<RestrictPageProps>) {
	const blurRestrictedContent: CSSProperties = {
		maxWidth: '100%',
		maxHeight: '100%',
		overflow: 'hidden',
		content: '""',
		pointerEvents: !showContent ? 'none' : 'auto',
		filter: !showContent ? 'blur(5px)' : 'none',
	};

	// const { lock, unlock } = useScrollLock();

	// useEffect(() => {
	// 	if (showContent === true) {
	// 		unlock();
	// 	}
	// }, [showContent]);

	return (
		<AnimatePresence>
			{!showContent && (
				<BlockRestrictedContent
					setShowRestrictedContent={setShowRestrictedContent}
				/>
			)}
			<div
				key="children"
				style={blurRestrictedContent}
				className="overflow-hidden"
			>
				{props.children}
			</div>
		</AnimatePresence>
	);
}
