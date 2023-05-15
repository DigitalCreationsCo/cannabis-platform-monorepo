import { Button, FlexBox, H2, Paragraph } from '@cd/ui-lib';
import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import { twMerge } from 'tailwind-merge';
import logo from '../../public/logo.png';

export type TopBarProps = {
    doesSessionExist?: boolean;
    setModal: Dispatch<SetStateAction<boolean>>;
    signedOut: () => void;
};

function TopBar({ doesSessionExist, setModal, signedOut }: TopBarProps) {
    const topbar = ['flex flex-row min-h-[66px] pr-4 lg:px-16 bg-inverse space-x-2 items-center shadow'];
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
        </div>
    );
}

export default TopBar;
