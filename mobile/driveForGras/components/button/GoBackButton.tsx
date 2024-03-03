import Icons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import { View } from '../Themed';
import IconButton from './IconButton';

interface GoBackButton {
	Icon?: any;
	onPress?: () => void;
	theme?: 'light' | 'dark';
	className?: string;
}

function GoBackButton({
	Icon = ({ color, size }: { color: string; size: number }) => (
		<Icons name="chevron-left" size={size} color={color} />
	),
	className,
	...props
}: GoBackButton) {
	return (
		<View>
			<IconButton
				primary
				style={{ borderRadius: 100, width: 30, height: 30 }}
				size={33}
				Icon={Icon}
				onPress={() => router.back()}
				{...props}
			/>
		</View>
	);
}

export default GoBackButton;
