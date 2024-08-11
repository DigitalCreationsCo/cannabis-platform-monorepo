import {
	ShieldCheckIcon,
	UserCircleIcon,
	UserIcon,
} from '@heroicons/react/24/outline';
import { signOut } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import NavigationItems, {
	type MenuItem,
	type NavigationProps,
} from './NavigationItems';

const UserNavigation = ({ activePathname }: NavigationProps) => {
	const { t } = useTranslation('common');

	const menus: MenuItem[] = [
		{
			name: t('account'),
			href: '/settings/account',
			icon: UserIcon,
			active: activePathname === '/settings/account',
		},
		{
			name: t('security'),
			href: '/settings/security',
			icon: ShieldCheckIcon,
			active: activePathname === '/settings/security',
		},
		{
			name: t('profile'),
			href: '/settings/profile',
			icon: UserCircleIcon,
			active: activePathname === '/settings/security',
		},
		// {
		// 	name: t('sign-out'),
		// 	onClick: () => signOut(),
		// 	icon: UserCircleIcon,
		// 	active: false,
		// },
	];

	return <NavigationItems menus={menus} />;
};

export default UserNavigation;
