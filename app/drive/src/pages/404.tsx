import {
	CopyRight,
	ErrorMessage,
	Page,
	type LayoutContextProps,
} from '@cd/ui-lib';

// eslint-disable-next-line @typescript-eslint/naming-convention
function _404({ code = 404 }: { code: number }) {
	return (
		<Page>
			<ErrorMessage
				code={code}
				message={`This resource is not found. Please try again or contact our support team.`}
			/>
			<CopyRight className="m-auto" />
		</Page>
	);
}

_404.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
});

export default _404;
