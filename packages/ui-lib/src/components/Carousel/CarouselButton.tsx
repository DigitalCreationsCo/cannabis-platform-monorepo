import { twMerge } from 'tailwind-merge';
import Icons from '../../icons';
import Button from '../button/Button';
import IconButton from '../button/IconButton';
import IconWrapper from '../IconWrapper';

type CarouselButtonProps = {
	direction: 'left' | 'right' | 'up' | 'down';
	onClick: (() => void) | undefined;
	className?: string | string[];
};

export default function CarouselButton({
	direction,
	onClick,
	className,
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
			'w-5 h-5 p-6',
			'rounded-full',
			'bg-transparent hover:bg-transparent hover:border-dark active:bg-transparent focus:bg-transparent focus:border focus:border-dark',
		],
	};

	return (
		<div className={twMerge(styles.container, className)}>
			<IconButton
				size="sm"
				onClick={onClick}
				className={twMerge(
					styles.carouselButton,
					'btn-circle btn items-center content-center justify-center shadow-none',
				)}
				Icon={arrowIcon()}
			/>
		</div>
	);
}
