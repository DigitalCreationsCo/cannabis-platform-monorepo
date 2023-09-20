import { type HTMLAttributes } from 'react';
import { TextContent } from '../../../core-lib/src';
import { Tiny } from './Typography';

function CopyRight(
	props: HTMLAttributes<HTMLDivElement> & {
		append?: string;
	},
) {
	return (
		<Tiny className={props.className}>
			{props.append} {TextContent.legal.COPYRIGHT}
		</Tiny>
	);
}

export default CopyRight;
