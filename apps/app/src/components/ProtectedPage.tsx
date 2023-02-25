import React from 'react';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';

// Will need to test admin level privelege for some api routes, like users/[id]
// will use this component to protect those routes from non-admin users

function ProtectedPage({ children }): React.ReactElement {
    const session = useSessionContext();
    if (session.loading === true) return <></>;
    // if (session.doesSessionExist) {
    //     return children;
    // }
    return <>{children}</>;
}

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

export default ProtectedPage;
