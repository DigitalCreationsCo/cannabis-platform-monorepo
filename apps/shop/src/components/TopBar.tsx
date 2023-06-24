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
                    <H2 className="pt-0.5">Gras</H2>
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

            <FlexBox className='flex flex-row items-center space-x-8 pr-0'>
                { isSignedIn && 
                    <Link className='hidden sm:block' href={getShopSite("/support")}>
                        <Paragraph className={twMerge('whitespace-nowrap pt-2')}>
                            Get Support
                        </Paragraph>
                    </Link>
                }

                {window?.location?.pathname === '/' ||
                    <Link href={getShopSite("/mybag")} passHref>
                            <IconButton
                            // onClick={openCartModal}
                            iconSize={28}
                            className='capitalize    bg-transparent shadow-none p-0 m-0 indicator btn focus:outline-none border-none pt-1' 
                            size='sm' 
                            hover='transparent'
                            Icon={icons.Satchel}
                            >
                                <Paragraph className='hidden md:block'>{`Bag`}</Paragraph>
                                { isCartEmpty && <></> || <div className={twMerge(styles.TOPBAR.badge)}>{cart.totalItems}</div> }
                            </IconButton>
                    </Link>}

                { isSignedIn && <AccountDropDown /> }
                { !isSignedIn && (
                    <FlexBox>
                        <Button 
                        className='pt-1'
                        size='sm' 
                        bg='transparent' 
                        hover='transparent'
                        onClick={openLoginModal}>
                            Sign In</Button>
                    </FlexBox>
                )}
            </FlexBox>
        </div>
    );
    
    
    function AccountDropDown () {
        return (
        <div className="dropdown dropdown-bottom relative">
            <Button
            className='btn focus:outline-none px-0 outline-none border-none'
            size='sm'
            border={false}
            bg='transparent' 
            hover='transparent'
            >
                <img 
                // src={user.profilePicture || '/user.png'}
                src={ user.profilePicture?.location as string }
                alt={user.username} 
                width={80}
                height={80}
                className="rounded-full border-2"
                />
            </Button>
            <ul className="shadow border menu dropdown-content bg-inverse rounded w-48 relative right-0 bottom-0 mt-2">
                <FlexBox>
                    <Button 
                    size='md' 
                    bg='transparent' 
                    hover='transparent'
                    onClick={signOut}>
                        Sign Out</Button>
                </FlexBox>
            </ul>
        </div>
        )
    }
}

export default TopBar;


