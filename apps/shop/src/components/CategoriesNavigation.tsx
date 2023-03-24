import { Icons, NavLink } from '@cd/shared-ui';
import { useRouter } from 'next/router';

const CategoriesNavigation = () => {
    let { pathname } = useRouter();
    return (
        <ul>
            {links.map((item) => {
                const href = (item.href.length > 1 && item.href.slice(1)) || item.href;
                pathname = (item.href.length === 1 && pathname.slice(1)) || pathname;
                return (
                    <NavLink href={item.href} key={item.title} isActive={pathname.startsWith(href)} Icon={item.icon}>
                        {item.title}
                    </NavLink>
                );
            })}
        </ul>
    );
};

const links = [
    {
        href: '/',
        title: 'All Products',
        icon: Icons.Home
    },
    {
        href: '/edibles',
        title: 'Edibles',
        icon: Icons.PackageBox
    },
    {
        href: '/flower',
        title: 'Flower',
        icon: Icons.Payment
    },
    {
        href: '/cbd',
        title: 'CBD',
        icon: Icons.User2
    }
];

export default CategoriesNavigation;
