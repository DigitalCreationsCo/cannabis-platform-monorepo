import { hasMembershipRoleAccess, selectUserState } from '@cd/core-lib';
import { LoadingPage } from '@cd/ui-lib';
import { useRouter } from 'next/router';
import { type PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';

interface ProtectedPageProps {
	protectedPages: string[];
}
function ProtectedPage({
	protectedPages,
	children,
}: ProtectedPageProps & PropsWithChildren) {
	const { user, isLoading } = useSelector(selectUserState);
	const router = useRouter();

	const pageIsProtected = protectedPages.indexOf(router.pathname) !== -1;
	if (isLoading) return <LoadingPage />;
	if (pageIsProtected && hasMembershipRoleAccess(user, 'MEMBER'))
		return { children };
	else router.push('/');
}

export default ProtectedPage;
