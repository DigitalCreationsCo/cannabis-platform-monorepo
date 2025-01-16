import { type PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import Icons from '../icons';
import IconWrapper from './IconWrapper';

const UploadImageBox = ({
	onClick,
	onKeyUp,
	fill,
	children,
}: { onClick: any; onKeyUp?: any; fill?: boolean } & PropsWithChildren) => {
	const styleUploadWindow = [
		fill ? 'h-full w-full' : 'h-[80px w-[80px]',
		'border flex rounded-btn items-center justify-center bg-light',
	];

	return (
		<button
			onClick={onClick}
			onKeyUp={onKeyUp}
			className={twMerge(styleUploadWindow, 'indicator')}
		>
			<span className="indicator-item badge bg-primary">
				<IconWrapper
					Icon={Icons.XIcon}
					iconSize={12}
					className={'fill-light'}
				/>
			</span>
			{children}
		</button>
	);
};

export default UploadImageBox;
