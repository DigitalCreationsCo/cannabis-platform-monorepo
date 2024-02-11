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
	const { driver, isSignedIn } = useSelector((state: AppState) => state.driver);
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
			isSession={isSignedIn}
			showFooter={false}
			{...props}
		>
			{props.children}
		</Layout>
	);
};

export default LayoutContainer;
