import { TextContent } from '@gras/core/src/constants'
import { type HTMLAttributes } from 'react';
import { Text } from '@mantine/core';

function CopyRight({
	prepend = TextContent.legal.COMPANY_NAME,
	...props
}: HTMLAttributes<HTMLDivElement> & {
	prepend?: string;
}) {
	return (
		<Text size='sm'>
			{prepend} {TextContent.legal.COPYRIGHT}
		</Text>
	);
}

export default CopyRight;
