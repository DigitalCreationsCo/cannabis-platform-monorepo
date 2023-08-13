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

import { LoadingPage } from '@cd/ui-lib';
import { useRouter } from 'next/router';
import { type PropsWithChildren } from 'react';
import Session from 'supertokens-auth-react/recipe/session';
import { UserRoleClaim } from 'supertokens-auth-react/recipe/userroles';

interface ProtectedPageProps extends PropsWithChildren {
	protectedPages: string[];
}

function ProtectedPage({
	protectedPages,
	children,
}: ProtectedPageProps): JSX.Element {
	const router = useRouter();

	const pageIsProtected = protectedPages.indexOf(router.pathname) !== -1;
	console.info('pageIsProtected 1 ', pageIsProtected);
	const claimValue = Session.useClaimValue(UserRoleClaim);
	console.info('claimValue', claimValue);
	if (claimValue.loading) {
		return <LoadingPage />;
	}
	if (!claimValue.doesSessionExist) {
		// router.push('/');
	}
	const roles = claimValue.value;
	if (
		pageIsProtected &&
		Array.isArray(roles) &&
		(roles.includes('ADMIN') ||
			roles.includes('OWNER') ||
			roles.includes('MEMBER'))
	) {
		console.info('pageIsProtected 2 ', pageIsProtected);
		return <>{children}</>;
	} else {
		console.info('pageIsProtected 3 ', pageIsProtected);
		return <>{children}</>;
	}
}

export default ProtectedPage;
