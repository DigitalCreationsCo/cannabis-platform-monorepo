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

	const settings = [
		{
			name: 'site-settings',
			href: TextContent.href.site_f(organization.id),
			title: 'Site Settings',
			icon: Icons.CategoryOutlined,
			enabled: FeatureConfig.storefront.enabled,
		},
		{
			name: 'widget-setup',
			href: TextContent.href.setup_widget_f(organization.id),
			title: 'Widget Setup',
			icon: Icons.WifiBridgeAlt,
			enabled: FeatureConfig.checkout_widget.enabled,
		},
		{
			name: 'payment-settings',
			href: TextContent.href.payment_settings_f(organization.id),
			title: 'Billing & Payments',
			icon: Icons.Payment,
			enabled: true,
		},
	];
	return (
		<Page className={twMerge('bg-light lg:min-h-[710px] sm:px-4 md:pr-16')}>
			<PageHeader title="Settings" Icon={Icons.Settings} />

			<div className="tabs">
				{settings.map((setting) => (
					<Link
						key={setting.name}
						className={twMerge('tab pl-0', setting.enabled ? '' : 'hidden')}
						href={setting.href}
					>
						<Button className="p-2">{setting.title}</Button>
					</Link>
				))}
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
