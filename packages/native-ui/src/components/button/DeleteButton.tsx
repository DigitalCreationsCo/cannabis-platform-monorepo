import { twMerge } from 'tailwind-merge';
import Icons from '../../icons';
import IconButton from './IconButton';

type DeleteButtonProps = {
	className?: string;
	size?: number;
	onPress: () => void;
	label?: boolean;
};
export default function DeleteButton({
	className,
	onPress,
	size = 12,
	label = true,
}: DeleteButtonProps) {
	return (
		<IconButton
			Icon={Icons.XIcon}
			className={twMerge(
				'max-w-[50px] md:max-w-[120px] text-primary sm:space-x-2 min-h-full sm:min-h-max',
				className,
			)}
			size={size}
			type="button"
			onPress={onPress}
		>
			{label && <div className="hidden md:block">Delete</div>}
		</IconButton>
	);
}
