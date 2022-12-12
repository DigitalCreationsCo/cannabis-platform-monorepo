// import FlexBox from "components/FlexBox";
// import Pages from "components/icons/Pages";
// import User2 from "components/icons/User2";
import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';
import NavLink, { NavLinkProps } from './NavLink';

interface DashboardNavLinkProps extends PropsWithChildren{
    isActive: boolean;
}
export const DashboardNavLink = ({ children, isActive, ...rest }: DashboardNavLinkProps & NavLinkProps) => {
    return (
        <NavLink { ...rest }>{ children }</NavLink>
    );
}

interface DashboardNavigationWrapperProps extends PropsWithChildren { }
export const DashboardNavigationWrapper = ({ children }: DashboardNavigationWrapperProps) => {
    return (
        <div className='h-7/8 overflow-auto z-10 shadow rounded-btn'>
            { children }
        </div>
    );
}

interface AdminDashboardProps extends PropsWithChildren {}

const AdminDashboardNavigation = ({ children }: AdminDashboardProps) => {
    const { pathname } = useRouter();
    return (
        <>
            <DashboardNavigationWrapper>
                {links.map((item) => (
                    // <StyledDashboardNav href={item.href} key={item.title} isCurrentPath={pathname.includes(item.href)}>
                    //     <FlexBox alignItems="center" gap={1}>
                    //         <item.icon className="nav-icon" fontSize="small" color="inherit" />
                        // </FlexBox>
                    // </StyledDashboardNav>
                    <DashboardNavLink isActive={false}>
                        <span>{item.title}</span>
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
