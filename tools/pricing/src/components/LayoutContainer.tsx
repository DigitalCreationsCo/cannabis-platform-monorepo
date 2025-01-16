import { selectModalState } from '@gras/core';
import { Layout, type LayoutContextProps } from '@gras/ui';
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
