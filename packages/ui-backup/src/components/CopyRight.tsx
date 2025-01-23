import { TextContent } from '../../../core/src/constants';
import { type HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { Tiny } from './Typography';

function CopyRight({
	prepend = TextContent.legal.COMPANY_NAME,
	...props
}: HTMLAttributes<HTMLDivElement> & {
	prepend?: string;
}) {
	return (
		<Tiny className={twMerge('lg:text-md', props.className)}>
			{prepend} {TextContent.legal.COPYRIGHT}
		</Tiny>
	);
}

export default CopyRight;
