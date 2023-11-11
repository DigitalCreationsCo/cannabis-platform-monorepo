import { type CarbonIconType } from '@carbon/icons-react';
import { type SVGAttributes } from 'react';
import { toast } from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';
import { useCopyToClipboard } from 'usehooks-ts';
import Icons from '../../icons';
import IconButton from './IconButton';

interface CopyClipboardButtonProps {
	Icon?: ((props: SVGAttributes<SVGElement>) => JSX.Element) | CarbonIconType;
	onClick?: (e: any) => void;
	theme?: 'light' | 'dark';
	iconSize?: number;
	className?: string;
	copyText: string;
}

function CopyClipboardButton({
	Icon = Icons.Copy,
	iconSize = 20,
	className,
	onClick,
	copyText,
	...props
}: CopyClipboardButtonProps) {
	const copyToClipboard = () => {
		navigator?.clipboard?.writeText(copyText);
		toast('Copied to clipboard.', { position: 'bottom-center' });
	};

	const closeButtonStyle = [
		'btn btn-ghost',
		'bg-transparent hover:bg-transparent rounded-full md:hover:bg-transparent shadow-none top-0 right-0 p-2 m-0 min-w-min h-min relative float-right',
		props.theme === 'light' ? 'text-light' : 'text-dark',
	];

	return (
		<div className={twMerge('relative top-0 right-0')}>
			<IconButton
				onClick={copyToClipboard}
				bg="transparent"
				hover="transparent"
				color="light"
				iconSize={iconSize}
				iconClass="rotate-90"
				className={twMerge(closeButtonStyle, className)}
				{...props}
				Icon={Icon}
			/>
		</div>
	);
}

export default CopyClipboardButton;
