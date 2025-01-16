import { useAppDispatch } from '@gras/core/hooks';
import { selectModalState, userActions } from '@gras/core/reducer';
import { type AppState } from '@gras/core/types';
import { Layout, type LayoutContextProps } from '@gras/ui';
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
