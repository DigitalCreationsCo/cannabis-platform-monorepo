import {
	type MouseEventHandler,
	type PropsWithChildren,
	type ReactEventHandler,
	type SVGAttributes,
} from 'react';
import IconWrapper from './IconWrapper';
import { Small } from './Typography';

function Tag({ Icon, onClick, children }: TagProps) {
	return (
		// <div
		<button
			onClick={onClick}
			onKeyUp={onClick}
			className="cursor-default badge badge-primary m-2 gap-2 w-[112px]"
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
} & PropsWithChildren;
