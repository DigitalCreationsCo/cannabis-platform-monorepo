import { hasMembershipRoleAccess, selectUserState } from '@cd/core-lib';
import { useRouter } from 'next/router';
import { useEffect, type PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
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
	const user = useSelector(selectUserState);

	const anyPrivatePage = protectedPages?.concat(memberPages, adminPages);
	const isProtectedPage = anyPrivatePage.find((page) =>
		router.pathname.includes(page),
	);
	const isMemberPage = memberPages.find((page) =>
		router.pathname.includes(page),
	);
	const isAdminPage = adminPages.find((page) => router.pathname.includes(page));

	// useEffect(() => {
	// 	if (
	// 		router.pathname === '/' &&
	// 		hasMembershipRoleAccess(user.user, 'MEMBER')
	// 	) {
	// 		console.log(
	// 			'push to dashboard ',
	// 			user.user.memberships?.[0].organizationId,
	// 		);
	// 		router.push(
	// 			TextContent.href.dashboard_f(
	// 				user.user.memberships?.[0].organizationId as string,
	// 			),
	// 		);
	// 	}
	// });

	useEffect(() => {
		if (isProtectedPage && !user.isSignedIn) {
			router.push('/');
		}
		if (isMemberPage && !hasMembershipRoleAccess(user.user, 'MEMBER')) {
			router.push('/');
		}
	}, [user]);

	if (
		user.isLoading &&
		isProtectedPage &&
		!hasMembershipRoleAccess(user.user, 'MEMBER')
	)
		return <LoadingPage />;

	return <>{children}</>;
}

export default ProtectedPage;
