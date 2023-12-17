import {
	type AppState,
	selectModalState,
	useAppDispatch,
	userActions,
} from '@cd/core-lib';
import { Layout, type LayoutContextProps } from '@cd/ui-lib';
import { type PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { FeatureConfig } from '../config/shop.features';
import CategoriesNavigation from './CategoriesNavigation';

const LayoutContainer = (props: LayoutContextProps & PropsWithChildren) => {
	const user = useSelector((state: AppState) => state.user);
	const { modalVisible } = useSelector(selectModalState);

	const dispatch = useAppDispatch();

	const signOut = async () => {
		dispatch(userActions.signOutUserAsync());
	};
	return (
		<Layout
			showHeaderDrawer={FeatureConfig.categories.enabled}
			isModalVisible={modalVisible}
			showSideNavOnDesktop={false}
			SideNavComponent={CategoriesNavigation}
			signOut={signOut}
			isSession={user.isSignedIn}
			{...props}
		>
			{props.children}
		</Layout>
	);
};

export default LayoutContainer;
