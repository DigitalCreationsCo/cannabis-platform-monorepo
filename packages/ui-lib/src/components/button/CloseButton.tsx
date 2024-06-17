import { XCircleIcon } from '@heroicons/react/24/outline';
import { type SVGAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import Icons from '../../icons';
import IconButton from './IconButton';

interface CloseButtonProps {
	Icon?: ((props: SVGAttributes<SVGElement>) => JSX.Element) | any;
	onClick?: (e: any) => void;
	theme?: 'light' | 'dark';
	iconSize?: number;
	className?: string;
}

function CloseButton({
	Icon = XCircleIcon,
	iconSize = 20,
	className,
	...props
}: CloseButtonProps) {
	const closeButtonStyle = [
		'btn btn-ghost top-0 right-0 p-2 m-0 min-w-min h-min absolute',
		props.theme === 'light' ? 'text-light' : 'text-dark',
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
