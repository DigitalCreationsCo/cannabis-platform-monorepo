import { selectModalState, userActions } from '@cd/core-lib';
import { Layout, type LayoutContextProps } from '@cd/ui-lib';
import { type PropsWithChildren } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/hooks';
import { type RootState } from '../redux/store';

const LayoutContainer = (props: LayoutContextProps & PropsWithChildren) => {
	const [, setCookie] = useCookies(['yesOver21']);

	const user = useSelector((state: RootState) => state.user);
	const { modalVisible } = useSelector(selectModalState);

	const dispatch = useAppDispatch();

	const signOut = async () => {
		dispatch(userActions.signOutUserAsync());
		setCookie('yesOver21', 'false', { path: '/' });
		console.debug('set yesOver21 cookie to false');
		window.location.reload();
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
