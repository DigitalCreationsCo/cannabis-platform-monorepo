// import { modalActions, modalTypes } from '@cd/shared-lib';
import { modalActions, modalTypes } from '@cd/shared-lib';
import { Button, FlexBox, H2, Paragraph } from '@cd/shared-ui';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import logo from '../../public/logo.png';
import { RootState } from '../redux/store';

export type TopBarProps = {
    doesSessionExist?: boolean;
    signedOut: () => void;
};

function TopBar({ doesSessionExist, signedOut }: TopBarProps) {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);

    function openLoginModal() {
        console.log('dispatch: open Login Modal');
        dispatch(
            modalActions.openModal({
                modalType: modalTypes.loginModal
            })
        );
    }

    const styles = {
        topbar: ['flex flex-row min-h-[66px] pr-4 lg:px-16 bg-inverse space-x-2 items-center shadow'],
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
                    'text-primary font-semibold'
                )}
            >
                Cannabis Marketplace
            </Paragraph>
            <div className="flex-1"></div>
            <Link href="/cart">
                <Button className="indicator w-[100px]">
                    Bag
                    {/* { totalItems >= 1 && ( */}
                    <div className={twMerge(styles.badge)}>{6}</div>
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
                        <Button onClick={signedOut}>Sign Out</Button>
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
