import { TextContent } from '@cd/core-lib';
import router from 'next/router';
import { Button } from './button';
import Center from './Center';
import CopyRight from './CopyRight';
import FlexBox from './FlexBox';
import { H1, H5, Paragraph } from './Typography';

function ErrorMessage({ code, message }: { code: number; message: string }) {
	return (
		<Center className="py-4 space-y-4">
			<H1 className="whitespace-pre-line text-center">
				{TextContent.error.REQUEST_FAILED}
			</H1>

			<FlexBox className="space-y-2">
				<H5 className="whitespace-pre-line text-center">{message}</H5>
				{code && <H5 className="text-error">{code} Error</H5>}
			</FlexBox>

			<Button onClick={() => router.back()}>{TextContent.ui.BACK}</Button>

			<Paragraph className="pt-2">
				<CopyRight />
			</Paragraph>
		</Center>
	);
}

export default ErrorMessage;
