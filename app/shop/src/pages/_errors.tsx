import { ErrorMessage, type LayoutContextProps, Page } from '@cd/ui-lib';
import { type AxiosError } from 'axios';
import { type NextPageContext } from 'next';

function Error({
	statusCode,
	message
}: {
	statusCode: number;
	message: string;
}) {
	return (
		<Page>
			{statusCode ? (
				<ErrorMessage
					code={statusCode}
					message={`Thank you for using our service. Our servers are not available currently. 
                    Please dial the support phone number or try again later. 
                    (${message})`}
				/>
			) : (
				<ErrorMessage
					code={statusCode}
					message={`Thank you for using our service. An error occurred. 
                    Please dial the support phone number or try again later. 
                    (${message})`}
				/>
			)}
		</Page>
	);
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
	const statusCode =
		(err as AxiosError)?.response?.status ??
		res?.statusCode ??
		err?.statusCode ??
		404;
	if (res && statusCode) {
		res.statusCode = statusCode;
	}
	const message = String(res?.statusMessage || err?.message || err);
	return { statusCode, message };
};

Error.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false
});

export default Error;
