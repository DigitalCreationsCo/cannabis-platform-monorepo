import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import { PropsWithChildren } from 'react';
import LandingPage from './Landing';
import { Center, LoadingDots, Page } from '@cd/shared-ui';

function ProtectedComponent({ children }: PropsWithChildren) {
    const session = useSessionContext();

    // if (session.loading) return <Page><Center><LoadingDots /></Center></Page>
    return session.doesSessionExist ? <>{ children }</> : <LandingPage />
}

// Will need to add member, admin, owner privilege to separate usage of app domains

// function ProtectedComponent() {
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

export default ProtectedComponent;
