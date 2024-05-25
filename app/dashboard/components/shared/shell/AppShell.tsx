import { LoadingPage } from '@cd/ui-lib';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { type PropsWithChildren, useState } from 'react';
import Drawer from './Drawer';
import Header from './Header';

export default function AppShell({ children }: PropsWithChildren) {
	const router = useRouter();
	const session = useSession();
	const { status } = session;
	const [sidebarOpen, setSidebarOpen] = useState(false);

	if (status === 'loading') {
		return <LoadingPage />;
	}

	if (status === 'unauthenticated') {
		router.push('/auth/login');
		return <></>;
	}

	return (
		<div>
			<Drawer sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
			<div className="lg:pl-64">
				<Header setSidebarOpen={setSidebarOpen} />
				<main className="py-5">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						{children}
					</div>
				</main>
			</div>
		</div>
	);
}
