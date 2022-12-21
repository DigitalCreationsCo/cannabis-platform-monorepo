import { useRouter } from 'next/router';
import { NavLink, Icons } from '@cd/shared-ui';

const AdminDashboardNavigation = () => {
    let { pathname } = useRouter();
    return (
        <div className="z-10 shadow rounded-btn">
            {links.map((item) => {
                let href = (item.href.length > 1 && item.href.slice(1)) || item.href;
                pathname = (item.href.length === 1 && pathname.slice(1)) || pathname;
                return (
                    <NavLink href={item.href} key={item.title} isActive={pathname.includes(href)} Icon={item.icon}>
                        {item.title}
                    </NavLink>
                );
            })}
        </div>
    );
};

const links = [
    {
        href: '/',
        title: 'Dashboard',
        icon: Icons.Home,
    },
    {
        href: '/products',
        title: 'Products',
        icon: Icons.PackageBox,
    },
    {
        href: '/orders',
        title: 'Orders',
        icon: Icons.Payment,
    },
    {
        href: '/users',
        title: 'Users',
        icon: Icons.User2,
    },
    {
        href: '/site-settings',
        title: 'Site Settings',
        icon: Icons.Wheel,
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

export default AdminDashboardNavigation;
