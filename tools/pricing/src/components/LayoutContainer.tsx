import { selectModalState } from '@cd/core-lib';
import { Layout, type LayoutContextProps } from '@cd/ui-lib';
import { type PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';

const LayoutContainer = (props: LayoutContextProps & PropsWithChildren) => {
	const { modalVisible } = useSelector(selectModalState);

	return (
		<Layout
			isModalVisible={modalVisible}
			showSideNavOnDesktop={false}
			SideNavComponent={() => <></>}
			isSession={false}
			{...props}
		>
			{props.children}
		</Layout>
	);
};

export default LayoutContainer;
