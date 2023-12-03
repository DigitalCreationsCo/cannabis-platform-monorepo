import { selectModalState, selectUserState, userActions } from '@cd/core-lib';
import { Layout, type LayoutContextProps } from '@cd/ui-lib';
import router from 'next/router';
import { type PropsWithChildren } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/hooks';
import BlogNavigation from './BlogNavigation';

const LayoutContainer = (props: LayoutContextProps & PropsWithChildren) => {
	const [, setCookie] = useCookies(['yesOver21']);

	const user = useSelector(selectUserState);
	const { modalVisible } = useSelector(selectModalState);

	const dispatch = useAppDispatch();

	const signOut = async () => {
		dispatch(userActions.signOutUserAsync());
		setCookie('yesOver21', 'false', { path: '/' });
		router.replace('/');
	};
	return (
		<div className="bg-accent">
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
