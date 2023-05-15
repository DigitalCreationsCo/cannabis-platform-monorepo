import { selectModalState, userActions } from '@cd/core-lib/src/reduxDir';
import { Layout, LayoutContextProps } from '@cd/ui-lib';
import React, { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import Session from "supertokens-auth-react/recipe/session";
import { useAppDispatch } from '../redux/hooks';
import { RootState } from '../redux/store';
import CategoriesNavigation from './CategoriesNavigation';
import TopBar from './TopBar';

const ShopLayoutContainer = (props: LayoutContextProps & PropsWithChildren) => {
    const user = useSelector((state: RootState) => state.user);
    const {modalVisible} = useSelector(selectModalState)

    const dispatch = useAppDispatch()
    
    const signOut = async () => {
        await Session.signOut(); 
        dispatch(userActions.signOutUserAsync())
        // window.location.href = "/"
    };

    return (
        <Layout
            isModalVisible={modalVisible}
            showSideNavOnDesktop={false}
            SideNavComponent={CategoriesNavigation}
            TopBarComponent={TopBar}
            signOut={signOut}
            isSession={user.isSignedIn}
            {...props}
        >
            {props.children}
        </Layout>
    );
};

export default ShopLayoutContainer;
