import { ErrorMessage, Page, type LayoutContextProps } from '@cd/ui-lib';

// eslint-disable-next-line @typescript-eslint/naming-convention
function _500() {
	return (
		<Page>
			<ErrorMessage
				code={500}
				message={`Thank you for using our service. Our servers are not available currently. 
                    Please dial the support phone number or try again later.`}
			/>
		</Page>
	);
}

_500.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
});

export default _500;
