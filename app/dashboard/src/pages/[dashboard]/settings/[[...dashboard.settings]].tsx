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
		<Page>
			<H2>Dashboard Settings</H2>
			<Link href={TextContent.href.site_f(organization.id)}>
				<Button>Site Settings</Button>
			</Link>
		</Page>
	);
}

function mapStateToProps(state: RootState) {
	const { dispensary } = state;
	return {
		orders: dispensary.orders,
	};
}
export default connect(mapStateToProps)(Settings);

Settings.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
	showSideNav: true,
});
