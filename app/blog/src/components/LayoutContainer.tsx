import {
	selectModalState,
	useAppDispatch,
	selectUserState,
	userActions,
} from '@cd/core-lib';
import { Layout, type LayoutContextProps } from '@cd/ui-lib';
import { type PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import BlogNavigation from './BlogNavigation';

const LayoutContainer = (props: LayoutContextProps & PropsWithChildren) => {
	const user = useSelector(selectUserState);
	const { modalVisible } = useSelector(selectModalState);

	const dispatch = useAppDispatch();

	const signOut = async () => {
		dispatch(userActions.signOutUserAsync());
	};
	return (
		<div className="bg-accent-soft">
			<Layout
				isModalVisible={modalVisible}
				SideNavComponent={BlogNavigation}
				signOut={signOut}
				isSession={user.isSignedIn}
				{...props}
			>
				{props.children}
			</Layout>
		</div>
	);
};

export default LayoutContainer;
