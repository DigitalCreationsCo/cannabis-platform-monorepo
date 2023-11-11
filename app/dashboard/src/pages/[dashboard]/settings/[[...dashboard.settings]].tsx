import { TextContent } from '@cd/core-lib';
import { type OrganizationWithDashboardDetails } from '@cd/data-access';
import {
	Button,
	H2,
	Icons,
	Page,
	PageHeader,
	type LayoutContextProps,
} from '@cd/ui-lib';
import Link from 'next/link';
import { connect } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import { type RootState } from '../../../redux/store';

function Settings({
	organization,
}: {
	organization: OrganizationWithDashboardDetails;
}) {
	if (!organization) throw new Error();

	return (
		<Page className={twMerge('sm:px-4 md:pr-16')}>
			<PageHeader title="Settings" Icon={Icons.Settings} />

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
