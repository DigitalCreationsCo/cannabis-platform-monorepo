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

	if (isProtectedPage && !user.isSignedIn) {
		console.info('ProtectedPage: user is not signed in');
		router.push('/');
	}
	if (isMemberPage && !hasMembershipRoleAccess(user.user, 'MEMBER')) {
		console.info('ProtectedPage: user is not a member');
		router.push('/');
	}
	if (isAdminPage && !hasMembershipRoleAccess(user.user, 'ADMIN')) {
		console.info('ProtectedPage: user is not an admin');
		router.push('/');
	}

	useEffect(() => {
		if (isProtectedPage && !user.isSignedIn) {
			console.info('ProtectedPage: user is not signed in');
			router.push('/');
		}
	}, [user]);
	useEffect(() => {
		if (isMemberPage && !hasMembershipRoleAccess(user.user, 'MEMBER')) {
			console.info('ProtectedPage: user is not a member');
			router.push('/');
		}
	}, [user]);
	useEffect(() => {
		if (isAdminPage && !hasMembershipRoleAccess(user.user, 'MEMBER')) {
			console.info('ProtectedPage: user is not an admin');
			router.push('/');
		}
	}, [user]);

	if (user.isLoading) return <LoadingPage />;

	return <>{children}</>;
}

export default ProtectedPage;
