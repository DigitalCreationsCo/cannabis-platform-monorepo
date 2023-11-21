import { type SVGAttributes } from 'react';
import { View, IconButton } from '@components';
import Icons from '../icons';

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
