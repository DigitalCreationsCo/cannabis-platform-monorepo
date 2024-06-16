import { Center, LoadingDots } from '@cd/ui-lib';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Drawer from './Drawer';
import Header from './Header';

export default function AppShell({ children }) {
	const router = useRouter();
	const { status } = useSession();
	const [sidebarOpen, setSidebarOpen] = useState(false);

	if (status === 'loading') {
		return (
			<Center>
				<LoadingDots />
			</Center>
		);
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
