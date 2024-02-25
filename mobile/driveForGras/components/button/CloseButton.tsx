import { type SVGAttributes } from 'react';
import Icons from '@expo/vector-icons/MaterialIcons';
import { View } from '../Themed';
import IconButton from './IconButton';

interface CloseButtonProps {
	Icon?: any;
	onPress?: () => void;
	theme?: 'light' | 'dark';
	className?: string;
}

function CloseButton({
	Icon = <Icons name='close' />,
	className,
	...props
}: CloseButtonProps) {
	return (
		<View>
			<IconButton size={16} {...props} Icon={Icon} />
		</View>
	);
}

export default CloseButton;
