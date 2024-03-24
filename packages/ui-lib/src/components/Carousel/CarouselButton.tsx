import { twMerge } from 'tailwind-merge';
import Icons from '../../icons';
import Button from '../button/Button';
import IconButton from '../button/IconButton';
import IconWrapper from '../IconWrapper';

type CarouselButtonProps = {
	direction: 'left' | 'right' | 'up' | 'down';
	onClick: (() => void) | undefined;
};

export default function CarouselButton({
	direction,
	onClick,
}: CarouselButtonProps) {
	const arrowIcon = () => {
		switch (direction) {
			case 'left':
				return Icons.ChevronLeft;
			case 'right':
				return Icons.ChevronRight;
			case 'up':
				return Icons.ChevronUp;
			case 'down':
				return Icons.ChevronDown;
		}
	};

	const styles = {
		container: ['z-10 relative h-fit', 'hidden', 'md:block'],
		carouselButton: [
			'w-5 h-5 p-5',
			'rounded-full',
			'bg-inverse-soft hover:bg-accent-soft active:bg-accent',
		],
	};

	return (
		<div className={twMerge(styles.container)}>
			<IconButton
				size="sm"
				onClick={onClick}
				className={twMerge(styles.carouselButton, 'btn-circle')}
				Icon={arrowIcon()}
			/>
		</div>
	);
}
