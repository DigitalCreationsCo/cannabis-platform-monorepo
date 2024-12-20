import { useAppDispatch } from '@cd/core-lib/hooks';
import { selectModalState, userActions } from '@cd/core-lib/reducer';
import { type AppState } from '@cd/core-lib/types';
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
			isModalVisible={modalVisible}
			showSideNavOnDesktop={false}
			SideNavComponent={() => <></>}
			signOut={signOut}
			isSession={user.isSignedIn}
			{...props}
		>
			{props.children}
		</Layout>
	);
};

export default LayoutContainer;
