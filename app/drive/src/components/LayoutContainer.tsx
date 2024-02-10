import {
	type AppState,
	selectModalState,
	useAppDispatch,
	userActions,
} from '@cd/core-lib';
import { Layout, type LayoutContextProps } from '@cd/ui-lib';
import { type PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';

const LayoutContainer = (props: LayoutContextProps & PropsWithChildren) => {
	const user = useSelector((state: AppState) => state.user);
	const { modalVisible } = useSelector(selectModalState);

	const dispatch = useAppDispatch();

	const signOut = async () => {
		dispatch(userActions.signOutUserAsync());
	};
	return (
		<Layout
			className="bg-secondary"
			showHeaderDrawer={true}
			isModalVisible={modalVisible}
			showSideNavOnDesktop={false}
			SideNavComponent={() => <>SideNavComponent</>}
			signOut={signOut}
			isSession={user.isSignedIn}
			showFooter={false}
			{...props}
		>
			{props.children}
		</Layout>
	);
};

export default LayoutContainer;
