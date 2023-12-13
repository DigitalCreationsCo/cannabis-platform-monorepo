import { LiveQueryProvider } from '@sanity/preview-kit';
import { useMemo } from 'react';
import { getClient } from '../lib/sanity.client';

export default function PreviewProvider({
	children,
	previewToken,
}: {
	children: React.ReactNode;
	previewToken: string;
}) {
	const client = useMemo(
		() => getClient({ token: previewToken }),
		[previewToken],
	);
	return <LiveQueryProvider client={client}>{children}</LiveQueryProvider>;
}
