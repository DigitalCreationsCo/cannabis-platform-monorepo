import { LoadingPage } from '@gras/ui';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useRouter as Router } from 'next/router';

import React, { type PropsWithChildren, useState } from 'react';
import Drawer from './Drawer';
import Header from './Header';

export default function AppShell({ children }: PropsWithChildren) {
	const router = useRouter();
	const { query } = Router();

	const session = useSession();
	const { status } = session;
	// eslint-disable-next-line prefer-const
	let [sidebarOpen, setSidebarOpen] = useState(false);
	const [stayOpen, setStayOpen] = useState(false);

	sidebarOpen = query.slug ? sidebarOpen : true;

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
				className={`${(sidebarOpen && 'lg:pl-60') || 'lg:pl-20'} transition-[padding]`}
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
