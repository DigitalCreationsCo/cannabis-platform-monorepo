import { Icons, NavLink, type NavLinkType } from '@cd/ui-lib';
import { useRouter } from 'next/router';

const CategoriesNavigation = () => {
	let { pathname } = useRouter();
	return (
		<ul>
			{links.map((item) => {
				const href = (item.href.length > 1 && item.href.slice(1)) || item.href;
				pathname = (item.href.length === 1 && pathname.slice(1)) || pathname;
				return (
					<NavLink
						link={item}
						key={item.title}
						isActive={pathname.startsWith(href)}
					>
						{item.title}
					</NavLink>
				);
			})}
		</ul>
	);
};

const links: NavLinkType[] = [
	{
		href: '/',
		title: 'All Products',
		icon: Icons.Home,
		enabled: true,
	},
	{
		href: '/edibles',
		title: 'Edibles',
		icon: Icons.PackageBox,
		enabled: true,
	},
	{
		href: '/flower',
		title: 'Flower',
		icon: Icons.Payment,
		enabled: true,
	},
	{
		href: '/cbd',
		title: 'CBD',
		icon: Icons.User2,
		enabled: true,
	},
];

export default CategoriesNavigation;
