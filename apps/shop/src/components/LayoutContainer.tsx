import { LayoutContextProps } from '@cd/shared-lib';
import { Layout } from '@cd/shared-ui';
import { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { signOut } from 'supertokens-auth-react/recipe/session';
import { RootState } from '../redux/store';
import TopBar from './TopBar';

const signedOut = async () => {
    signOut();
};

const LayoutContainer = (props: LayoutContextProps & PropsWithChildren) => {
    const user = useSelector((state: RootState) => state.user);
    return (
        <Layout
            SideNavComponent={() => (
                <ul>
                    <li>all products</li>
                    <li>edibles</li>
                    <li>flower</li>
                    <li>cbd</li>
                </ul>
            )}
            TopBarComponent={TopBar}
            signedOut={signedOut}
            isSession={user.isSignedIn}
            {...props}
        >
            {props.children}
        </Layout>
    );
};

export default LayoutContainer;
