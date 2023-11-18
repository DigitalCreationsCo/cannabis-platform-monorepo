import { Text } from '@themed';
import Icons from '../../icons';
import IconButton from './IconButton';

type DeleteButtonProps = {
	size?: number;
	onPress: () => void;
	label?: boolean;
};
export default function DeleteButton({
	onPress,
	size = 12,
	label = true,
}: DeleteButtonProps) {
	return (
		<IconButton Icon={Icons.XIcon} size={size} type="button" onPress={onPress}>
			{label && <Text>Delete</Text>}
		</IconButton>
	);
}
