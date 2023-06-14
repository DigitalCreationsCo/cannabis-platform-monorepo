import { getSiteUrl, modalActions, modalTypes, selectCartState, selectIsCartEmpty, selectUserState } from '@cd/core-lib';
import { Button, FlexBox, H2, IconButton, Paragraph } from '@cd/ui-lib';
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
    const user = useSelector(selectUserState);
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

    const styles = {
        topbar: ['flex flex-row min-h-[66px] pr-4 lg:pr-16 bg-inverse items-center shadow z-10'],
        badge: 'indicator absolute inline-flex items-center justify-center w-6 h-6 text-sm text-light bg-primary -top-2 -right-2 rounded-full'
    };

    return (
        <div className={twMerge(styles.topbar)}>
            <div className='pl-2 flex items-center'>
            <Link href={getSiteUrl("/")} passHref>
                <Image alt="Gras" width={50} height={50} src={logo} />
            </Link>
            <Link href={getSiteUrl("/")}>
                <H2 className="pt-1">Gras</H2>
            </Link>
            </div>
            <Paragraph
                className={twMerge(
                    'pt-2',
                    'pl-2',
                    'text-lg',
                    'hidden',
                    'md:block',
                    'place-self-center',
                    'text-primary font-semibold',
                    'cursor-default',
                    'md:cursor-default'
                )}
            >
                Cannabis Marketplace
            </Paragraph>
            <div className="flex-1"></div>
            
            <Link href={getSiteUrl("/mybag")} passHref>
                <IconButton 
                className='bg-transparent shadow-none px-4' 
                size='sm' 
                hover='transparent'
                Icon={icons.ShoppingBag}
                />
                {/* <Button
                    className="indicator w-[100px]"
                    // onClick={openCartModal}
                >
                    <>
                        Bag
                        {isCartEmpty || <div className={twMerge(styles.badge)}>{cart.totalItems}</div>}
                    </>
                </Button> */}
            </Link>

            {user.isSignedIn ? (
                <>
                    <Link href={getSiteUrl("/support")}>
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
