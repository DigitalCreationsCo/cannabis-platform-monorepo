import {
	type MouseEventHandler,
	type PropsWithChildren,
	type ReactEventHandler,
	type SVGAttributes,
} from 'react';
import { twMerge } from 'tailwind-merge';
import IconWrapper from './IconWrapper';
import { Small } from './Typography';

function Tag({ Icon, onClick, children, className }: TagProps) {
	return (
		<button
			onClick={onClick}
			onKeyUp={onClick}
			className={twMerge(
				'cursor-default',
				'badge badge-primary',
				'm-2 gap-2',
				'w-[112px]',
				className,
			)}
		>
			<Small>{children}</Small>
			{Icon && <IconWrapper Icon={Icon} className="fill-light" iconSize={11} />}
		</button>
	);
}

export default Tag;

type TagProps = {
	Icon?: ((props: SVGAttributes<SVGElement>) => JSX.Element) | null;
	onClick?: MouseEventHandler<HTMLElement> & ReactEventHandler<Element>;
	className?: string | string[];
} & PropsWithChildren;
