import { selectModalState } from '@cd/core-lib/reduxDir';
import { Layout, LayoutContextProps } from '@cd/ui-lib';
import { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { signOut } from 'supertokens-auth-react/recipe/session';
import { RootState } from '../redux/store';
import CategoriesNavigation from './CategoriesNavigation';
import TopBar from './TopBar';

const signedOut = async () => {
    signOut();
};

const LayoutContainer = (props: LayoutContextProps & PropsWithChildren) => {
    const user = useSelector((state: RootState) => state.user);
    const {modalVisible} = useSelector(selectModalState)
    return (
        <Layout
            isModalVisible={modalVisible}
            showSideNavOnDesktop={false}
            SideNavComponent={CategoriesNavigation}
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
