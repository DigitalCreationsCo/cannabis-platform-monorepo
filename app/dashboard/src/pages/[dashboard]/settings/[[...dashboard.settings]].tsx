import { TextContent } from '@cd/core-lib';
import { type OrganizationWithDashboardDetails } from '@cd/data-access';
import { Button, H2, Page, type LayoutContextProps } from '@cd/ui-lib';
import Link from 'next/link';
import { connect } from 'react-redux';
import { type RootState } from '../../../redux/store';

function Settings({
	organization,
}: {
	organization: OrganizationWithDashboardDetails;
}) {
	return (
		<Page className="p-1">
			<H2>Settings</H2>
			<div className="tabs">
				<Link
					className="tab pl-0"
					href={TextContent.href.site_f(organization.id)}
				>
					<Button className="p-2">Site Settings</Button>
				</Link>
				<Link
					className="tab pl-0"
					href={TextContent.href.setup_widget_f(organization.id)}
				>
					<Button className="p-2">Setup Checkout Widget</Button>
				</Link>
			</div>
		</Page>
	);
}

Settings.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
	showSideNav: true,
});

function mapStateToProps(state: RootState) {
	const { dispensary } = state;
	return {
		organization: dispensary.dispensary,
	};
}
export default connect(mapStateToProps)(Settings);
