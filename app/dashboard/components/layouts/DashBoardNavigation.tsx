import { selectDispensaryState, TextContent } from '@gras/core';
import { NavLink, type NavLinkType } from '@gras/ui';
import {
	BuildingOfficeIcon,
	ChatBubbleLeftIcon,
	DocumentIcon,
	ShoppingCartIcon,
	TruckIcon,
	UserIcon,
	UsersIcon,
	WrenchIcon,
	BuildingStorefrontIcon,
	TicketIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { FeatureConfig } from '@/lib/features';

export const getNavLinkGroups = (id = 'undefined'): NavLinkType[] =>
	[
		{
			href: TextContent.href.dashboard_f(id),
			title: 'Home',
			icon: BuildingOfficeIcon,
			enabled: true,
		},
		{
			href: TextContent.href.customers_f(id),
			title: 'Customers',
			icon: UsersIcon,
			enabled: FeatureConfig.weed_text.enabled,
		},
		{
			href: TextContent.href.daily_deals_weed_text_f(id),
			title: 'Daily Deals',
			icon: ChatBubbleLeftIcon,
			enabled: FeatureConfig.weed_text.enabled,
		},
		{
			href: TextContent.href.orders_f(id),
			title: 'Orders',
			icon: DocumentIcon,
			enabled: FeatureConfig.orders.enabled,
		},
		{
			href: TextContent.href.delivery_tracking_f(id),
			title: 'Tracking',
			icon: TruckIcon,
			enabled: FeatureConfig.delivery_tracking.enabled,
		},
		{
			href: TextContent.href.products_f(id),
			title: 'Products',
			icon: ShoppingCartIcon,
			enabled: FeatureConfig.products.enabled,
		},
		{
			href: TextContent.href.users_f(id),
			title: 'Users',
			icon: UserIcon,
			enabled: FeatureConfig.users.enabled,
		},
		{
			href: TextContent.href.settings_f(id),
			title: 'Settings',
			icon: WrenchIcon,
			enabled: true,
		},
		{
			href: TextContent.href.site_f(id),
			title: 'Site Settings',
			icon: BuildingStorefrontIcon,
			enabled: FeatureConfig.storefront.enabled,
		},
		{
			href: TextContent.href.setup_widget_f(id),
			title: 'Widget Setup',
			icon: TicketIcon,
			enabled: FeatureConfig.checkout_widget.enabled,
		},
	].filter((link) => link.enabled);

const DashboardNavigation = () => {
	const { pathname } = useRouter();
	const { dispensary } = useSelector(selectDispensaryState);
	const navLinkGroups = getNavLinkGroups(dispensary?.id);

	function renderNavLinkAndSubLinks(navLinkGroup: NavLinkType[]): any[] {
		return navLinkGroup
			.filter((link) => link.enabled)
			.map((link) => (
				<NavLink
					key={link.title}
					link={link}
					isActive={pathname.startsWith(link.href)}
				>
					{link.title}
				</NavLink>
			));
	}

	return <ul>{renderNavLinkAndSubLinks(navLinkGroups)}</ul>;
};

export default DashboardNavigation;
