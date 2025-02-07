"use client"

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
		>
					{'Previewing drafts. '}
					<a
						href="/api/disable-draft"
						className="underline transition-colors duration-200 hover:text-cyan"
					>
						Back to published
					</a>
		</div>
	);
}
