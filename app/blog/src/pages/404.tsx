import { ErrorMessage, Page, type LayoutContextProps } from '@cd/ui-lib';

// eslint-disable-next-line @typescript-eslint/naming-convention
function _404({ code = 404 }: { code: number }) {
	return (
		<Page className="pb-0">
			<ErrorMessage
				code={code}
				message={`Please try again.
				If you need help, `}
			/>
		</Page>
	);
}

_404.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
	showSideNav: false,
});

export default _404;
