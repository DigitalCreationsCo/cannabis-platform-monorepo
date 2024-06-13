import {
	hasMembershipRoleAccess,
	selectDriverState,
	selectUserState,
} from '@cd/core-lib';
import { Role, type User } from '@cd/data-access';
import { useRouter } from 'next/router';
import { type PropsWithChildren } from 'react';
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
	const userState = useSelector(selectUserState);
	const driverState = useSelector(selectDriverState);

	let user, isSignedIn, isLoading;
	switch (true) {
		case typeof userState !== 'undefined':
			user = userState?.user as User;
			isSignedIn = userState?.isSignedIn;
			isLoading = userState?.isLoading;
			break;
		case typeof driverState !== 'undefined':
			user = driverState?.driver?.user as User;
			isSignedIn = driverState?.isSignedIn;
			isLoading = driverState?.isLoading;
			break;
	}

	const anyPrivatePage = protectedPages?.concat(memberPages, adminPages);
	const isProtectedPage = anyPrivatePage.find((page) =>
		router.pathname.includes(page)
	);
	const isMemberPage = memberPages.find((page) =>
		router.pathname.includes(page)
	);
	const isAdminPage = adminPages.find((page) => router.pathname.includes(page));

	if (isProtectedPage && !isSignedIn) {
		console.info('ProtectedPage: user is not signed in, redirecting');
		router.push('/');
	}
	if (isMemberPage && !hasMembershipRoleAccess(user as User, Role.MEMBER)) {
		console.info('ProtectedPage: user is not a member, redirecting');
		router.push('/');
	}
	if (isAdminPage && !hasMembershipRoleAccess(user as User, Role.ADMIN)) {
		console.info('ProtectedPage: user is not an admin, redirecting');
		router.push('/');
	}

	if (isLoading) return <LoadingPage />;

	return <>{children}</>;
}

export default ProtectedPage;
