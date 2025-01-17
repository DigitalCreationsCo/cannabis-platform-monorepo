"use client"

/* eslint-disable i18next/no-literal-string */
/* eslint-disable @next/next/no-html-link-for-pages */
import { Center } from '@gras/ui';
import { useSyncExternalStore } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const subscribe = () => () => {};

export default function Alert({
	preview,
	loading,
}: {
	preview?: boolean;
	loading?: boolean;
}) {
	const shouldShow = useSyncExternalStore(
		subscribe,
		() => window.top === window,
		() => false
	);

	if (!shouldShow || !preview) return null;

	return (
		<div
			className={`${
				loading ? 'animate-pulse' : ''
			} border-b border-accent-7 bg-accent-7 text-white`}
		>
			<Center>
				<div className="py-2 text-center text-sm">
					{'Previewing drafts. '}
					<a
						href="/api/disable-draft"
						className="underline transition-colors duration-200 hover:text-cyan"
					>
						Back to published
					</a>
				</div>
			</Center>
		</div>
	);
}
