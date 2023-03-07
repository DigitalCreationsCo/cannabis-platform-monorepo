import { Button, FlexBox, H2, logo, Paragraph } from '@cd/shared-ui';
import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import { twMerge } from 'tailwind-merge';

export type TopBarProps = {
    doesSessionExist?: boolean;
    setModal: Dispatch<SetStateAction<boolean>>;
    signedOut: () => void;
};

function TopBar({ doesSessionExist, setModal, signedOut }: TopBarProps) {
    const topbar = ['flex flex-row h-[66px] pr-4 lg:px-16 bg-inverse space-x-2 items-center shadow'];
    return (
        <div className={twMerge(topbar)}>
            <Link href="/" passHref>
                <Image alt="Gras" width={50} height={50} src={logo} />
            </Link>
            <Link href="/">
                <H2 className="pt-1">Gras</H2>
            </Link>
            <Link href="/">
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
            </Link>
            <div className="flex-1"></div>
            {doesSessionExist && (
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
            )}
            {!doesSessionExist && (
                <FlexBox>
                    <Button onClick={() => setModal(true)}>Sign In</Button>
                </FlexBox>
            )}
            {/* cart button for user app */}
            {/* <Link href="/cart">
                <Button className="relative">
                    Bag
                    { totalItems >= 1 && (
                        <div
                            className={ twMerge(
                                'absolute inline-flex items-center justify-center w-6 h-6 text-sm text-light bg-primary -top-2 -right-2 rounded-full'
                            ) }
                        >
                            { totalItems }
                        </div>
                    ) }
                </Button>
            </Link> */}
        </div>
    );
}

export default TopBar;
