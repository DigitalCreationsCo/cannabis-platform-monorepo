import CacheProvider from '@cd/core-lib/src/lib/cache';
import React from 'react';
import { SWRConfig } from 'swr';
import AppShell from '../shared/shell/AppShell';

interface AccountLayoutProps {
	children: React.ReactNode;
}

export default function AccountLayout({ children }: AccountLayoutProps) {
	return (
		<SWRConfig
			value={{
				revalidateOnFocus: false,
				provider: CacheProvider,
			}}
		>
			<AppShell>{children}</AppShell>
		</SWRConfig>
	);
}
