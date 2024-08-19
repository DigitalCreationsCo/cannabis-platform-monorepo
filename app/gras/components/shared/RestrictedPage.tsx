import { useScrollLock } from '@cd/ui-lib';
import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useEffect, type CSSProperties, type PropsWithChildren } from 'react';

interface RestrictPageProps {
	restrictContent?: boolean;
	setBlockRestrictedContent?: (boolean) => void;
}

const BlockRestrictedContent = dynamic(() =>
	import('./RestrictedContentModal').then((mod) => mod.default)
);
export default function RestrictPage({
	restrictContent = true,
	setBlockRestrictedContent,
	...props
}: PropsWithChildren<RestrictPageProps>) {
	const blurRestrictedContent: CSSProperties = {
		maxWidth: '100%',
		maxHeight: '100%',
		overflow: 'hidden',
		content: '""',
		pointerEvents: restrictContent ? 'none' : 'auto',
		filter: restrictContent ? 'blur(5px)' : 'none',
	};

	const { lock, unlock } = useScrollLock();

	useEffect(() => {
		if (restrictContent !== true) {
			unlock();
		}
	}, [restrictContent]);

	return (
		<AnimatePresence>
			{restrictContent && (
				<BlockRestrictedContent
					setBlockRestrictedContent={setBlockRestrictedContent}
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
