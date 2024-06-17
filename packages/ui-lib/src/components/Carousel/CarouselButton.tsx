import {
	ChevronDownIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronUpIcon,
} from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';
import IconButton from '../button/IconButton';

type CarouselButtonProps = {
	direction: 'left' | 'right' | 'up' | 'down';
	onClick: (() => void) | any;
	className?: string | string[];
	disabled?: boolean;
};

export default function CarouselButton({
	direction,
	onClick,
	className,
	disabled,
}: CarouselButtonProps) {
	const arrowIcon = () => {
		switch (direction) {
			case 'left':
				return ChevronLeftIcon;
			case 'right':
				return ChevronRightIcon;
			case 'up':
				return ChevronUpIcon;
			case 'down':
				return ChevronDownIcon;
		}
	};

	const styles = {
		container: ['z-10 h-fit w-fit', 'hidden', 'md:block'],
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
				disabled={disabled}
				className={twMerge(
					styles.carouselButton,
					'btn-circle btn items-center content-center justify-center shadow-none'
				)}
				Icon={arrowIcon()}
			/>
		</div>
	);
}
