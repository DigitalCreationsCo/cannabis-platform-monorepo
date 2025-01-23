"use client"
import { hasMembershipRoleAccess } from '../../../core/src/auth';
import { Role, type User } from '@gras/data-access';
import { useRouter, usePathname } from 'next/navigation';
import { type PropsWithChildren } from 'react';
import LoadingPage from './LoadingPage';

interface ProtectedPageProps {
	protectedPages?: string[];
	memberPages?: string[];
	adminPages?: string[];
}
function ProtectedPage({
	protectedPages = [],
	memberPages = [],
	adminPages = [],
	children,
}: ProtectedPageProps & PropsWithChildren) {
	const router = useRouter();
	const pathname = usePathname()

	const anyPrivatePage = protectedPages?.concat(memberPages, adminPages);
	const isProtectedPage = anyPrivatePage.find((page) =>
		pathname.includes(page)
	);
	const isMemberPage = memberPages.find((page) =>
		pathname.includes(page)
	);
	const isAdminPage = adminPages.find((page) => pathname.includes(page));

	// if (isProtectedPage && !isSignedIn) {
	// 	router.push('/');
	// }
	// if (isMemberPage && !hasMembershipRoleAccess(user!, Role.MEMBER)) {
	// 	router.push('/');
	// }
	// if (isAdminPage && !hasMembershipRoleAccess(user!, Role.ADMIN)) {
	// 	router.push('/');
	// }

	// if (isLoading) return <LoadingPage />;

	return <>{children}</>;
}

export default ProtectedPage;
