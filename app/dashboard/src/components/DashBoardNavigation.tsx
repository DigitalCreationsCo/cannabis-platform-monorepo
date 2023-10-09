import { selectDispensaryState, TextContent } from '@cd/core-lib';
import { Icons, NavLink, type NavLinkType } from '@cd/ui-lib';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { FeatureConfig } from '../config/dashboard.features';

const DashboardNavigation = () => {
	const { pathname } = useRouter();
	const { dispensary } = useSelector(selectDispensaryState);

	function renderNavLinkAndSubLinks(navLinkGroup: NavLinkType[]): any[] {
		return navLinkGroup
			.filter((link) => link.enabled)
			.map((link) => (
				// isArray(item) ? (
				// 	renderNavLinkAndSubLinks(item)
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

	const navLinkGroups: NavLinkType[] = [
		{
			href: TextContent.href.dashboard_f(dispensary.id),
			title: 'Home',
			icon: Icons.WatsonHealthDicomOverlay,
			enabled: true,
		},
		{
			href: TextContent.href.orders_f(dispensary.id),
			title: 'Orders',
			icon: Icons.DeliveryTruck,
			enabled: FeatureConfig.orders.enabled,
		},
		{
			href: TextContent.href.products_f(dispensary.id),
			title: 'Products',
			icon: Icons.Product,
			enabled: FeatureConfig.products.enabled,
		},
		{
			href: TextContent.href.users_f(dispensary.id),
			title: 'Users',
			icon: Icons.UserAvatarFilledAlt,
			enabled: FeatureConfig.users.enabled,
		},
		{
			href: TextContent.href.settings_f(dispensary.id),
			title: 'Settings',
			icon: Icons.Settings,
			enabled: true,
			subLinks: [
				{
					href: TextContent.href.site_f(dispensary.id),
					title: 'Site Settings',
					icon: Icons.CategoryOutlined,
					enabled: true,
				},
				{
					href: TextContent.href.setup_widget_f(dispensary.id),
					title: 'Widget Setup',
					icon: Icons.WifiBridgeAlt,
					enabled: true,
				},
			],
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
	];
	return <ul>{renderNavLinkAndSubLinks(navLinkGroups)}</ul>;
};

export default DashboardNavigation;
