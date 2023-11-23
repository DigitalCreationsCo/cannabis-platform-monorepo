import React, { type PropsWithChildren, type SVGAttributes } from 'react';
import { type GestureResponderEvent } from 'react-native';
import IconWrapper from './IconWrapper';
import { Text, View } from './Themed';

function Tag({ Icon, onClick, children }: TagProps) {
	return (
		<View onResponderStart={onClick}>
			<Text>{children}</Text>
			{Icon && <IconWrapper Icon={Icon} size={11} />}
		</View>
	);
}

export default Tag;

type TagProps = {
	Icon?: ((props: SVGAttributes<SVGElement>) => JSX.Element) | null;
	onClick?: (event: GestureResponderEvent) => void;
} & PropsWithChildren;
