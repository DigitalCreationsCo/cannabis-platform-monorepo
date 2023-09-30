import { TextContent } from '@cd/core-lib';
import router from 'next/router';
import { Button } from './button';
import Center from './Center';
import CopyRight from './CopyRight';
import { H1, H4, H5, Paragraph } from './Typography';

function ErrorMessage({ code, message }: { code: number; message: string }) {
	return (
		<Center className="text-center m-auto">
			<H1 className="whitespace-pre-line text-center">
				{TextContent.error.REQUEST_FAILED}
			</H1>
			<H5 className="whitespace-pre-line text-center">{message}</H5>
			{code && <H4 className="text-error">{code} Error</H4>}
			<Button onClick={() => router.back()}>{TextContent.ui.BACK}</Button>
			<Paragraph className="pt-2">
				<CopyRight />
			</Paragraph>
		</Center>
	);
}

export default ErrorMessage;
