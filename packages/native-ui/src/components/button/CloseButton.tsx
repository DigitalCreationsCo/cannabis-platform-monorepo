import { type CarbonIconType } from '@carbon/icons-react';
import { type SVGAttributes } from 'react';
import { View } from '@themed';
import Icons from '../../icons';
import IconButton from './IconButton';

interface CloseButtonProps {
	Icon?: ((props: SVGAttributes<SVGElement>) => JSX.Element) | CarbonIconType;
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
