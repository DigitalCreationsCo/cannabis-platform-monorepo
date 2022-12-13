import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';
import { Span } from 'shared-ui';
import FlexBox from './FlexBox';
import NavLink, { NavLinkProps } from './NavLink';

export const DashboardNavLink = ({ children, isActive, ...rest }: DashboardNavLinkProps) => {
    return (
        <div className="w-full">
            <NavLink isActive={isActive} { ...rest }>{ children }</NavLink>
        </div>
    );
}

type DashboardNavLinkProps = NavLinkProps
type DashboardNavigationWrapperProps = PropsWithChildren
interface AdminDashboardProps extends PropsWithChildren {}

export const DashboardNavigationWrapper = ({ children }: DashboardNavigationWrapperProps) => {
    return (
        <div className='sidebar-nav-height h-7/8 overflow-auto z-10 shadow rounded-btn'>
            { children }
        </div>
    );
}

const AdminDashboardNavigation = ({ children }: AdminDashboardProps) => {
    const { pathname } = useRouter();
    return (
        <>
            <DashboardNavigationWrapper>
                { links.map((item) => (
                    <DashboardNavLink href={ item.href } key={ item.title } isActive={ pathname.includes(item.href) }>
                        <FlexBox>
                {/*         <item.icon className="nav-icon" fontSize="small" color="inherit" /> */}
                            <Span>{ item.title }</Span>
                        </FlexBox>
                    </DashboardNavLink>
                ))}
            </DashboardNavigationWrapper>
            {children}
        </>
    );
};

const links = [
    {
        href: '/',
        title: 'Dashboard',
        // icon: Dashboard,
    },
    {
        href: '/products',
        title: 'Products',
        // icon: Assignment,
    },
    {
        href: '/orders',
        title: 'Orders',
    //     icon: ShoppingCart,
    },
    {
        href: '/users',
        title: 'Users',
        // icon: User2,
    },
    {
        href: '/site-settings',
        title: 'Site Settings',
        // icon: Settings,
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
