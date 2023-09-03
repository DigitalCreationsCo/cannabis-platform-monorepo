import {
	Grid,
	H4,
	H5,
	Icons,
	type LayoutContextProps,
	Page,
	PageHeader,
} from '@cd/ui-lib';

function Support() {
	return (
		<Page className="md:max-w-1/2">
			<PageHeader title="Support" Icon={Icons.Shield} />
			<Grid className="space-y-4 px-2">
				<H5 className="whitespace-pre-line">{` 
            Thanks for choosing Gras.
            We're working around the clock to deliver a world class support service for your business.
            For software support, please dial the toll-free support phone number. `}</H5>
				<H4 className="whitespace-pre-line text-left">{`24 / 7 Gras Support Phone Number: 
                1-800-GREEN-35`}</H4>
			</Grid>
		</Page>
	);
}

Support.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
	showSideNav: true,
});

export default Support;
