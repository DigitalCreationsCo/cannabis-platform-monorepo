import {
	hasMembershipRoleAccess,
	selectUserState,
	TextContent,
} from '@cd/core-lib';
import { LoadingPage } from '@cd/ui-lib';
import { useRouter } from 'next/router';
import { useEffect, type PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';

interface ProtectedPageProps {
	protectedPages: string[];
}
function ProtectedPage({
	protectedPages,
	children,
}: ProtectedPageProps & PropsWithChildren) {
	const router = useRouter();
	const pageIsProtected = protectedPages.find((page) =>
		router.pathname.includes(page),
	);
	const user = useSelector(selectUserState);

	useEffect(() => {
		if (
			router.pathname === '/' &&
			hasMembershipRoleAccess(user.user, 'MEMBER')
		) {
			console.log(
				'push to dashboard ',
				user.user.memberships?.[0].organizationId,
			);
			router.push(
				TextContent.href.dashboard_f(
					user.user.memberships?.[0].organizationId as string,
				),
			);
		}
	});

	useEffect(() => {
		if (pageIsProtected && !hasMembershipRoleAccess(user.user, 'MEMBER')) {
			router.push('/');
		}
	});

	if (
		user.isLoading &&
		pageIsProtected &&
		!hasMembershipRoleAccess(user.user, 'MEMBER')
	)
		return <LoadingPage />;

	return <>{children}</>;
}

export default ProtectedPage;
