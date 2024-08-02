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
	const [stayOpen, setStayOpen] = useState(false);

	if (status === 'loading') {
		return <LoadingPage />;
	}

	if (status === 'unauthenticated') {
		router.push('/auth/login');
		return <></>;
	}

	return (
		<div className="min-h-screen lg:pb-24">
			<Drawer
				sidebarOpen={sidebarOpen}
				setSidebarOpen={setSidebarOpen}
				stayOpen={stayOpen}
			/>
			<div
				className={`${(sidebarOpen && 'lg:pl-64') || 'lg:pl-20'} transition-[padding]`}
			>
				<Header
					setSidebarOpen={setSidebarOpen}
					sidebarOpen={sidebarOpen}
					setStayOpen={setStayOpen}
				/>
				<main className="py-5 md:h-fit bg-white shadow-inner">
					<div className="mx-auto px-4 lg:!px-8">{children}</div>
				</main>
			</div>
		</div>
	);
}
