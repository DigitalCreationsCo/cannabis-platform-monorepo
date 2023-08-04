import { selectModalState, userActions } from '@cd/core-lib/src/reduxDir';
import { Layout, type LayoutContextProps } from '@cd/ui-lib';
import { type PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import Session from 'supertokens-auth-react/recipe/session';
import { useAppDispatch } from '../redux/hooks';
import { type RootState } from '../redux/store';
import AdminDashboardNavigation from './AdminDashBoardNavigation';
import AdminTopBar from './AdminTopBar';

const AdminLayoutContainer = (
	props: LayoutContextProps & PropsWithChildren,
) => {
	const user = useSelector((state: RootState) => state.user);
	const { modalVisible } = useSelector(selectModalState);

	const dispatch = useAppDispatch();

	const signOut = async () => {
		await Session.signOut();
		dispatch(userActions.signOutUserAsync());
		window.location.href = '/';
	};

	return (
		<Layout
			isModalVisible={modalVisible}
			showSideNavOnDesktop={true}
			SideNavComponent={AdminDashboardNavigation}
			TopBarComponent={AdminTopBar}
			signOut={signOut}
			isSession={user.isSignedIn}
			{...props}
		>
			{props.children}
		</Layout>
	);
};

export default AdminLayoutContainer;
