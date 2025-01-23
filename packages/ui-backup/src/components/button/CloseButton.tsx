import { XMarkIcon } from '@tabler/icons-react';
import { type SVGAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import IconButton from './IconButton';

interface CloseButtonProps {
	Icon?: ((props: SVGAttributes<SVGElement>) => JSX.Element) | any;
	onClick?: (e: any) => void;
	theme?: 'light' | 'dark';
	iconSize?: number;
	className?: string;
}

function CloseButton({
	Icon = XMarkIcon,
	iconSize = 20,
	className,
	...props
}: CloseButtonProps) {
	const closeButtonStyle = [
		'btn btn-ghost top-0 right-0 p-2 m-0 min-w-min h-min absolute',
		props.theme === 'light' ? 'text-light' : 'text-inherit',
	];

	return (
		<div className={twMerge('fixed top-5 right-6')}>
			<IconButton
				bg="transparent"
				hover="transparent"
				color="light"
				iconSize={iconSize}
				className={twMerge(closeButtonStyle, className)}
				{...props}
				Icon={Icon}
			/>
		</div>
	);
}

export default CloseButton;
