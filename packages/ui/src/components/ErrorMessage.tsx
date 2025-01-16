import { TextContent } from '../../../core/src/constants';
import Link from 'next/link';
import router from 'next/router';
import { Button } from './button';
import Center from './Center';
import { H1, H5, Span } from './Typography';

function ErrorMessage({
	code,
	message = `Please try again.
If you need help, `,
}: {
	code?: number;
	message?: any;
}) {
	return (
		<Center className="text-center m-auto">
			<H1 className="whitespace-pre-line text-center">
				{TextContent.error.REQUEST_FAILED}
			</H1>
			<H5 className="whitespace-pre-line pt-4 pb-8 text-center">
				{message}
				{'\n'}
				<Link href={TextContent.href.support} className="underline">
					Get Support
				</Link>
				{'\n'}
				<Span className="text-error text-center inline">{code || ''}</Span>
			</H5>
			<Button onClick={() => router.back()}>Go back</Button>
		</Center>
	);
}

export default ErrorMessage;
