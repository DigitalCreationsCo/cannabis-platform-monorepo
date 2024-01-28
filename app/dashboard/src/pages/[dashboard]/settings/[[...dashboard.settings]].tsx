import { type AppState, TextContent } from '@cd/core-lib';
import { type OrganizationWithDashboardDetails } from '@cd/data-access';
import {
	Button,
	Icons,
	Page,
	PageHeader,
	type LayoutContextProps,
} from '@cd/ui-lib';
import Link from 'next/link';
import { connect } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import { FeatureConfig } from 'config/dashboard.features';

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
					className={twMerge(
						'tab pl-0',
						FeatureConfig.storefront.enabled ? '' : 'hidden',
					)}
					href={TextContent.href.site_f(organization.id)}
				>
					<Button className="p-2">Site Settings</Button>
				</Link>
				<Link
					className={twMerge(
						'tab pl-0',
						FeatureConfig.checkout_widget.enabled ? '' : 'hidden',
					)}
					href={TextContent.href.setup_widget_f(organization.id)}
				>
					<Button className="p-2">Widget Setup</Button>
				</Link>
			</div>
		</Page>
	);
}

Settings.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
	showSideNav: true,
});

function mapStateToProps(state: AppState) {
	const { dispensary } = state;
	return {
		organization: dispensary.dispensary,
	};
}
export default connect(mapStateToProps)(Settings);
