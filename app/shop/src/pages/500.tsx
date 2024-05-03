import {
	CopyRight,
	ErrorMessage,
	Page,
	type LayoutContextProps,
} from '@cd/ui-lib';

// eslint-disable-next-line @typescript-eslint/naming-convention
function _500() {
	return (
		<Page>
			<ErrorMessage
				code={500}
				message={`An error occured. Please try again or contact our support team.`}
			/>
			<CopyRight className="m-auto" />
		</Page>
	);
}

_500.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
});

export default _500;
