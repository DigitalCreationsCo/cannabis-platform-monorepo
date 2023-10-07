import { type HTMLAttributes } from 'react';
import { TextContent } from '../../../core-lib/src';
import { Tiny } from './Typography';

function CopyRight({
	prepend = TextContent.legal.COMPANY_NAME,
	...props
}: HTMLAttributes<HTMLDivElement> & {
	prepend?: string;
}) {
	return (
		<Tiny className={props.className}>
			{prepend} {TextContent.legal.COPYRIGHT}
		</Tiny>
	);
}

export default CopyRight;
