import { hasMembershipRoleAccess, selectUserState } from '@cd/core-lib';
import { useRouter } from 'next/router';
import { useEffect, type PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import LoadingPage from '../pages/LoadingPage';

interface ProtectedPageProps {
	protectedPages: string[];
}
function ProtectedPage({
	protectedPages,
	children,
}: ProtectedPageProps & PropsWithChildren) {
	const router = useRouter();
	const pageIsProtected = protectedPages.indexOf(router.pathname) !== -1;
	const user = useSelector(selectUserState);

	useEffect(() => {
		if (
			router.pathname === '/' &&
			hasMembershipRoleAccess(user.user, 'MEMBER')
		) {
			router.push('/dashboard');
		}
	}, [router]);

	useEffect(() => {
		if (pageIsProtected && !hasMembershipRoleAccess(user.user, 'MEMBER')) {
			router.push('/');
		}
	}, [
		user.isLoading,
		hasMembershipRoleAccess(user.user, 'MEMBER'),
		pageIsProtected,
	]);

	if (
		user.isLoading ||
		(pageIsProtected && !hasMembershipRoleAccess(user.user, 'MEMBER'))
	)
		return <LoadingPage />;

	return <>{children}</>;
}

export default ProtectedPage;
