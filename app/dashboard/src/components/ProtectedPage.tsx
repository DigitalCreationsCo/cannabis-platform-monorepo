/* eslint-disable sonarjs/no-all-duplicated-branches */
/* eslint-disable sonarjs/no-duplicated-branches */
// import React, { type PropsWithChildren } from 'react';

// Will need to test admin level privelege for some api routes, like users/[id]
// will use this component to protect those routes from non-admin users

// refactor this component to get the session,
// and pass the session to child page,
// if there is no page, return the not found error page
// function ProtectedPage({ children }: PropsWithChildren): React.ReactElement {
// const session = useSessionContext();
// if (session.loading === true) return <></>;
// if (session.doesSessionExist) {
//     return children;
// }
// return <>{children}</>;
// }

// Will need to add member, admin, owner privilege to separate usage of app domains

// function ProtectedPage() {
//     let claimValue = Session.useClaimValue(UserRoleClaim);
//     if (claimValue.loading || !claimValue.doesSessionExist) {
//         return (
//             <Layout>
//                 <Page className="flex border">
//                     <Center>Please login to view this!</Center>
//                     <button onClick={() => SuperTokensReact.redirectToAuth({ show: 'signin' })}>sign in</button>
//                 </Page>
//             </Layout>
//         );
//     }
//     let roles = claimValue.value;
//     if (roles !== undefined && roles.includes('admin')) {
//         // User is an admin
//         return <>Hello admin user</>;
//     } else {
//         // User doesn't have any roles, or is not an admin..
//         return <>Hello, you are not an admin user</>;
//     }
// }

import { selectUserState } from '@cd/core-lib';
import { LoadingPage } from '@cd/ui-lib';
import { useRouter } from 'next/router';
import { type PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import Session from 'supertokens-auth-react/recipe/session';
import UserRole, {
	UserRoleClaim,
} from 'supertokens-auth-react/recipe/userroles';

interface ProtectedPageProps extends PropsWithChildren {
	protectedPages: string[];
}

function ProtectedPage({
	protectedPages,
	children,
}: ProtectedPageProps): JSX.Element {
	const { user, isLoading } = useSelector(selectUserState);
	const router = useRouter();

	const pageIsProtected = protectedPages.indexOf(router.pathname) !== -1;
	console.info('pageIsProtected? ', pageIsProtected);

	async function run() {
		const accessTokenPayload = await Session.getAccessTokenPayloadSecurely();
		console.log('accessTokenPayload: ', accessTokenPayload);
		const roleValueFromPayload =
			UserRole.UserRoleClaim.getValueFromPayload(accessTokenPayload);
		console.log('roleValueFromPayload: ', roleValueFromPayload);

		canAccessPage().then((result) => console.log('can access page: ', result));
	}
	run();

	const sessionClaimValue = Session.useClaimValue(UserRoleClaim);
	console.info('sessionClaimValue: ', sessionClaimValue);

	if (sessionClaimValue.loading) {
		return <LoadingPage />;
	}
	if (!sessionClaimValue.doesSessionExist) {
		// router.push('/');
	}
	const roles = sessionClaimValue.value;
	console.info('roles sessionClaimValue', roles);

	// if (
	// 	pageIsProtected &&
	// 	Array.isArray(roles) &&
	// 	(roles.includes('ADMIN') ||
	// 		roles.includes('OWNER') ||
	// 		roles.includes('MEMBER'))
	// ) {
	// 	console.info('pageIsProtected 2 ', pageIsProtected);
	// 	return <>{children}</>;
	// } else {
	// 	console.info('pageIsProtected 3 ', pageIsProtected);
	// 	return <>{children}</>;
	// }
	const membershipRole = user.memberships?.[0]?.role.toLocaleUpperCase();
	if (
		pageIsProtected &&
		(membershipRole === 'MEMBER' ||
			membershipRole === 'ADMIN' ||
			membershipRole === 'OWNER')
	) {
		return <>{children}</>;
	} else {
		return <>Not an admin, can't access this page.</>;
	}
}

export default ProtectedPage;

async function canAccessPage(): Promise<boolean> {
	if (await Session.doesSessionExist()) {
		const validationErrors = await Session.validateClaims({
			overrideGlobalClaimValidators: (globalValidators) => [
				...globalValidators,
				// UserRoleClaim.validators.includes('OWNER'),
				// UserRoleClaim.validators.includes('ADMIN'),
				UserRoleClaim.validators.includes('MEMBER'),
			],
		});
		console.info('validation errors: ', validationErrors);
		if (validationErrors.length === 0) {
			// user is an admin
			return true;
		}

		for (const err of validationErrors) {
			if (err.validatorId === UserRoleClaim.id) {
				// user roles claim check failed
			} else {
				// some other claim check failed (from the global validators list)
			}
		}
	}
	// either a session does not exist, or one of the validators failed.
	// so we do not allow access to this page.
	return false;
}
