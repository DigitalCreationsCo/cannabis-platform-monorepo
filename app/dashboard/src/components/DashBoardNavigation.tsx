import { isArray, selectDispensaryState, TextContent } from '@cd/core-lib';
import { Icons, NavLink, type NavLinkType } from '@cd/ui-lib';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { FeatureConfig } from '../config/dashboard.features';

export const getNavLinkGroups = (id = 'undefined'): NavLinkType[] =>
	[
		{
			href: TextContent.href.dashboard_f(id),
			title: 'Home',
			icon: Icons.Home,
			enabled: true,
		},
		{
			href: TextContent.href.orders_f(id),
			title: 'Orders',
			icon: Icons.WatsonHealthDicomOverlay,
			enabled: FeatureConfig.orders.enabled,
		},
		{
			href: TextContent.href.delivery_tracking_f(id),
			title: 'Tracking',
			icon: Icons.DeliveryTruck,
			enabled: FeatureConfig.delivery_tracking.enabled,
		},
		{
			href: TextContent.href.products_f(id),
			title: 'Products',
			icon: Icons.Product,
			enabled: FeatureConfig.products.enabled,
		},
		{
			href: TextContent.href.users_f(id),
			title: 'Users',
			icon: Icons.UserAvatarFilledAlt,
			enabled: FeatureConfig.users.enabled,
		},
		{
			href: TextContent.href.settings_f(id),
			title: 'Settings',
			icon: Icons.Settings,
			enabled: true,
			// subLinks: [
			// 	{
			// 		href: TextContent.href.site_f(id),
			// 		title: 'Site Settings',
			// 		icon: Icons.CategoryOutlined,
			// 		enabled: FeatureConfig.storefront.enabled,
			// 	},
			// 	{
			// 		href: TextContent.href.setup_widget_f(id),
			// 		title: 'Widget Setup',
			// 		icon: Icons.WifiBridgeAlt,
			// 		enabled: true,
			// 	},
			// ],
		},
		{
			href: TextContent.href.site_f(id),
			title: 'Site Settings',
			icon: Icons.CategoryOutlined,
			enabled: FeatureConfig.storefront.enabled,
		},
		{
			href: TextContent.href.setup_widget_f(id),
			title: 'Widget Setup',
			icon: Icons.WifiBridgeAlt,
			enabled: true,
		},
		// {
		//   href: "/delivery-time",
		//   title: "Delivery Time",
		//   icon: LocalShipping,
		// },
		// {
		//   href: "/category-list",
		//   title: "Categories",
		//   icon: Category,
		// },
		// {
		//   href: "/slider",
		//   title: "Product Slider",
		//   icon: Slideshow,
		// },
		// {
		//   href: "/services",
		//   title: "Services",
		//   icon: Construction,
		// },
		// {
		//   href: "/pages",
		//   title: "Pages",
		//   icon: Pages,
		// },
		// {
		//   href: "/icons",
		//   title: "Icons",
		//   icon: Image,
		// },
	].filter((link) => link.enabled);

const DashboardNavigation = () => {
	const { pathname } = useRouter();
	const { dispensary } = useSelector(selectDispensaryState);
	const navLinkGroups = getNavLinkGroups(dispensary?.id);

	function renderNavLinkAndSubLinks(navLinkGroup: NavLinkType[]): any[] {
		return navLinkGroup
			.filter((link) => link.enabled)
			.map((link) => (
				// isArray(link) ? (
				// 	renderNavLinkAndSubLinks(link)
				// ) :
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
