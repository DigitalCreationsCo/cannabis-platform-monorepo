import { selectDispensaryState, TextContent } from '@cd/core-lib';
import { Icons, NavLink } from '@cd/ui-lib';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { FeatureConfig } from '../config/feature';

const DashboardNavigation = () => {
	const { pathname } = useRouter();
	const { dispensary } = useSelector(selectDispensaryState);
	return (
		<ul>
			{[
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
					href: TextContent.href.site_f(dispensary.id),
					title: 'Site Settings',
					icon: Icons.SettingsAdjust,
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
			]
				.filter((item) => item.enabled)
				.map((item) => (
					<NavLink
						href={item.href}
						key={item.title}
						isActive={pathname.startsWith(item.href)}
						Icon={item.icon}
					>
						{item.title}
					</NavLink>
				))}
		</ul>
	);
};

export default DashboardNavigation;
