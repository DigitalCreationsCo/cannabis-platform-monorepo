import { View } from 'react-native';
import { H4 } from '../Typography';
import Button, { ButtonProps } from './Button';

export default function BannerButton(props: ButtonProps) {
	return (
		<View className="w-full absolute bottom-0 p-2">
			<Button size="lg" bg="primary" {...props}>
				<H4 color={!props.disabled ? 'light' : 'dark'}>{props.children}</H4>
			</Button>
		</View>
	);
}
