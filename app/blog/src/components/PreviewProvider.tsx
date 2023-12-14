import { LiveQueryProvider } from 'next-sanity/preview';

import { useMemo } from 'react';
import { getClient } from '../lib/sanity.client';

export default function PreviewProvider({
	children,
	previewToken,
	draftMode,
}: {
	children: React.ReactNode;
	previewToken: string;
	draftMode: boolean;
}) {
	const client = useMemo(
		() => getClient(draftMode ? { token: previewToken } : undefined),
		[previewToken, draftMode],
	);
	return <LiveQueryProvider client={client}>{children}</LiveQueryProvider>;
}
