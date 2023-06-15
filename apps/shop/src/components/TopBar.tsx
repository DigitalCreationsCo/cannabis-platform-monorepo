import { getDashboardSite, getShopSite, modalActions, modalTypes, selectCartState, selectIsCartEmpty, selectUserState } from '@cd/core-lib';
import { Button, FlexBox, H2, IconButton, Paragraph, styles } from '@cd/ui-lib';
import icons from '@cd/ui-lib/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import logo from '../../public/logo.png';

export type TopBarProps = {
    doesSessionExist?: boolean;
    signOut: () => void;
};

function TopBar({ signOut }: TopBarProps) {
    
    const dispatch = useDispatch();
    const { user, isSignedIn } = useSelector(selectUserState);
    const cart = useSelector(selectCartState);
    const isCartEmpty = useSelector(selectIsCartEmpty);

    function openLoginModal() {
        dispatch(
            modalActions.openModal({
                modalType: modalTypes.loginModal
            })
        );
    }

    // function openCartModal() {
    //     console.log('dispatch: open cart Modal');
    //     dispatch(
    //         modalActions.openModal({
    //             modalType: modalTypes.cartModal
    //         })
    //     );
    // }
    function getUserHome() {
        const 
        dashboardDomain = process.env.NEXT_PUBLIC_DASHBOARD_APP_URL;
        
        if (user.memberships?.[0]?.role.toLocaleUpperCase() === 'ADMIN' ||
            user.memberships?.[0]?.role.toLocaleUpperCase() === 'OWNER')
            return getDashboardSite('/dashboard');
        else
        if (window.location.href.startsWith(dashboardDomain || 'app'))
        return getDashboardSite('/');
        else 
        return getShopSite('/');
    }

    return (
        <div className={twMerge(styles.TOPBAR.topbar)}>
            <div className='pl-2 flex items-center'>
                <Link href={getUserHome()} passHref>
                    <Image alt="Gras" width={50} height={50} src={logo} />
                </Link>
                <Link href={getUserHome()}>
                    <H2 className="pt-1">Gras</H2>
                </Link>
            </div>
            <Link href={getUserHome()}>
                <Paragraph
                    className={twMerge(
                        styles.TOPBAR.tagline
                    )}
                >
                    Cannabis Marketplace
                </Paragraph>
            </Link>
            <div className="flex-1"></div>
            
            {window?.location?.pathname === '/' ||
            <Link href={getShopSite("/mybag")} passHref>
                <IconButton 
                className='bg-transparent shadow-none px-4' 
                size='sm' 
                hover='transparent'
                Icon={icons.ShoppingBag}
                >
                    { isCartEmpty && <></> || <div className={twMerge(styles.TOPBAR.badge)}>{cart.totalItems}</div> }
                </IconButton>
                {/* <Button
                    className="indicator w-[100px]"
                    // onClick={openCartModal}
                >
                    <>
                        Bag
                        {isCartEmpty || <div className={twMerge(styles.badge)}>{cart.totalItems}</div>}
                    </>
                </Button> */}
            </Link>}

            {isSignedIn ? (
                <>
                    <Link href={getShopSite("/support")}>
                        <Paragraph className={twMerge('pt-1', 'px-3', 'text-md', 'whitespace-nowrap')}>
                            Need Support?
                        </Paragraph>
                    </Link>
                    <FlexBox>
                        <Button onClick={signOut}>Sign Out</Button>
                    </FlexBox>
                </>
            ) : (
                <FlexBox>
                    <Button 
                    className='px-4'
                    size='sm' 
                    bg='transparent' 
                    hover='transparent'
                    onClick={openLoginModal}>
                        Sign In</Button>
                </FlexBox>
            )}
        </div>
    );
}

export default TopBar;
