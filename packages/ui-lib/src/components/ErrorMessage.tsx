import { TextContent } from '@cd/core-lib';
import Link from 'next/link';
import router from 'next/router';
import { Button } from './button';
import Center from './Center';
import CopyRight from './CopyRight';
import { H1, H5, Paragraph, Span } from './Typography';

function ErrorMessage({ code, message = '' }: { code: number; message?: any }) {
	return (
		<Center className="text-center m-auto">
			<H1 className="whitespace-pre-line text-center">
				{TextContent.error.REQUEST_FAILED}
			</H1>
			<H5 className="whitespace-pre-line pt-4 pb-8 text-center">
				{message}{' '}
				<Link href={TextContent.href.support} className="underline">
					get support
				</Link>
				.
				{/* <Span className="text-error text-center inline">{code || ''}</Span> */}
			</H5>
			<Button onClick={() => router.back()}>{TextContent.ui.BACK}</Button>
			<Paragraph className="pt-2">
				<CopyRight />
			</Paragraph>
		</Center>
	);
}

export default ErrorMessage;
