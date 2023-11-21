import { View } from '@themed';
import { type SVGAttributes } from 'react';
import Icons from '../icons';
import IconButton from './IconButton';

interface CloseButtonProps {
	Icon?: (props: SVGAttributes<SVGElement>) => JSX.Element;
	onPress?: () => void;
	theme?: 'light' | 'dark';
	className?: string;
}

function CloseButton({
	Icon = Icons.XIcon,
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
