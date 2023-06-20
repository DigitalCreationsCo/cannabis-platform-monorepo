import { Icons, NavLink } from '@cd/ui-lib';
import { useRouter } from 'next/router';

const AdminDashboardNavigation = () => {
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
        href: '/dashboard',
        title: 'Home',
        icon: Icons.WatsonHealthDicomOverlay
    },
    {
        href: '/orders',
        title: 'Orders',
        icon: Icons.DeliveryTruck
    },
    {
        href: '/products',
        title: 'Products',
        icon: Icons.Product
    },
    {
        href: '/users',
        title: 'Users',
        icon: Icons.UserAvatarFilledAlt
    },
    {
        href: '/site-settings',
        title: 'Site Settings',
        icon: Icons.SettingsAdjust
    }
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

export default AdminDashboardNavigation;
