// import { modalActions, modalTypes } from '@cd/core-lib';
import { modalActions, modalTypes, selectCartState, selectIsCartEmpty, selectUserState } from '@cd/core-lib';
import { Button, FlexBox, H2, Paragraph } from '@cd/ui-lib';
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
        topbar: ['flex flex-row min-h-[66px] pr-4 lg:px-16 bg-inverse space-x-2 items-center shadow z-10'],
        badge: 'indicator absolute inline-flex items-center justify-center w-6 h-6 text-sm text-light bg-primary -top-2 -right-2 rounded-full'
    };

    return (
        <div className={twMerge(styles.topbar)}>
            <Link href="/" passHref>
                <Image alt="Gras" width={50} height={50} src={logo} />
            </Link>
            <Link href="/">
                <H2 className="pt-1">Gras</H2>
            </Link>
            <Paragraph
                className={twMerge(
                    'pt-2',
                    'pl-2',
                    'text-lg',
                    'hidden',
                    'md:block',
                    'place-self-center',
                    'text-primary font-semibold',
                    'cursor-default'
                )}
            >
                Cannabis Marketplace
            </Paragraph>
            <div className="flex-1"></div>
            <Link href="/mybag" passHref>
                <Button
                    className="indicator w-[100px]"
                    // onClick={openCartModal}
                >
                    <>
                        Bag
                        {isCartEmpty || <div className={twMerge(styles.badge)}>{cart.totalItems}</div>}
                    </>
                </Button>
            </Link>

            {user.isSignedIn ? (
                <>
                    <Link href="/support">
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
                    <Button onClick={openLoginModal}>Sign In</Button>
                </FlexBox>
            )}
        </div>
    );
}

export default TopBar;
