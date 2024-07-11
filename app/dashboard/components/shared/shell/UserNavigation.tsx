import {
	CheckBadgeIcon,
	RectangleStackIcon,
	ShieldCheckIcon,
	UserCircleIcon,
} from '@heroicons/react/24/outline';
import { useTranslation } from 'next-i18next';
import NavigationItems, {
	type MenuItem,
	type NavigationProps,
} from './NavigationItems';

const UserNavigation = ({ activePathname }: NavigationProps) => {
	const { t } = useTranslation('common');

	const menus: MenuItem[] = [
		{
			name: t('all-teams'),
			href: '/teams',
			icon: RectangleStackIcon,
			active: activePathname === '/teams',
		},
		{
			name: t('account'),
			href: '/settings/account',
			icon: UserCircleIcon,
			active: activePathname === '/settings/account',
		},
		{
			name: t('security'),
			href: '/settings/security',
			icon: ShieldCheckIcon,
			active: activePathname === '/settings/security',
		},
		{
			name: t('support'),
			href: '/support',
			active: activePathname === '/support',
			icon: CheckBadgeIcon,
			// eslint-disable-next-line sonarjs/no-all-duplicated-branches
			items: activePathname?.includes('/support')
				? [
						// {
						// 	name: t('support'),
						// 	href: '/support',
						// 	active: activePathname === '/support',
						// },
					]
				: [],
		},
	];

	return <NavigationItems menus={menus} />;
};

export default UserNavigation;
