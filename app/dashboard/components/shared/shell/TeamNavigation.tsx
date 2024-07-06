import {
	Cog6ToothIcon,
	BuildingOfficeIcon,
	DocumentTextIcon,
	ChatBubbleBottomCenterTextIcon,
	UserGroupIcon,
	TicketIcon,
} from '@heroicons/react/24/outline';
import { useTranslation } from 'next-i18next';
import NavigationItems, {
	type NavigationProps,
	type MenuItem,
} from './NavigationItems';

interface NavigationItemsProps extends NavigationProps {
	slug: string;
}

const TeamNavigation = ({ slug, activePathname }: NavigationItemsProps) => {
	const { t } = useTranslation('common');

	const menus: MenuItem[] = [
		{
			href: `/teams/${slug}/home`,
			name: 'Home',
			icon: BuildingOfficeIcon,
			// enabled: true,
			active: activePathname === `/teams/${slug}/home`,
		},
		{
			href: `/teams/${slug}/customers`,
			name: 'Customers',
			icon: UserGroupIcon,
			// enabled: FeatureConfig.weed_text.enabled,
			active: activePathname === `/teams/${slug}/customers`,
		},
		{
			href: `/teams/${slug}/events`,
			name: 'Events',
			icon: TicketIcon,
			// enabled: FeatureConfig.events.enabled,
			active: activePathname === `/teams/${slug}/events`,
		},
		{
			href: `/teams/${slug}/daily-deals`,
			name: 'Daily Deals',
			icon: ChatBubbleBottomCenterTextIcon,
			// enabled: FeatureConfig.weed_text.enabled,
			active: activePathname === `/teams/${slug}/daily-deals`,
		},
		// {
		// 	href: `/teams/${slug}/orders`,
		// 	name: 'Orders',
		// 	icon: DocumentTextIcon,
		// 	// enabled: FeatureConfig.orders.enabled,
		// 	active: activePathname === `/teams/${slug}/orders`,
		// },

		// {
		// 	href: `/teams/${slug}/home`,
		// 	title: 'Tracking',
		// 	icon: Icons.DeliveryTruck,
		// 	enabled: FeatureConfig.delivery_tracking.enabled,
		// active: activePathname === `/teams/${slug}/products`,
		// },
		// {
		// 	name: t('all-products'),
		// 	href: `/teams/${slug}/products`,
		// 	icon: CodeBracketIcon,
		// 	active: activePathname === `/teams/${slug}/products`,
		// },
		{
			name: t('settings'),
			href: `/teams/${slug}/settings`,
			icon: Cog6ToothIcon,
			active: activePathname === `/teams/${slug}/settings`,
		},
	];

	return <NavigationItems menus={menus} />;
};

export default TeamNavigation;
