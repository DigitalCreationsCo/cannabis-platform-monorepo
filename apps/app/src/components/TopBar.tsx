import cx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/logo.png'
import { H2, Paragraph, Button } from '@cd/shared-ui';
// import { Session } from "next-auth";
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface TopBarProps {
    // session: Session | null;
    session: any;
    totalItems: number;
    auth: Function
}

function TopBar({ session, totalItems = 0, auth }: TopBarProps) {
    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const toggleDialog = () => setDialogOpen(!dialogOpen);

    const topbar = cx('flex flex-row h-[66px] pr-4 lg:px-8 bg-default space-x-2 items-center shadow');
    return (
        <div className={cx(topbar)}>
            <Link href="/" passHref>
                <Image alt="Gras" width={50} height={50} src={logo} />
            </Link>
            <Link href="/">
                <H2>Gras</H2>
            </Link>
            <Link href="/">
                <Paragraph
                    className={cx(
                        'pt-1',
                        'text-primary',
                        'text-lg',
                        'hidden',
                        'md:block',
                        'place-self-center',
                    )}
                >
                    Cannabis Marketplace
                </Paragraph>
            </Link>

            <div className="flex-1"></div>

            {/* {session?.user && ( */ }
            {session && (
                <Link href="/support">
                    <Paragraph className={cx('pt-1', 'text-md', 'whitespace-nowrap')}>Need Support?</Paragraph>
                </Link>
            )}

            <div className="flex flex-row space-x-4">
                {!session && (
                    <Button
                        className="bg-inverse-soft md:hover:bg-inverse text-inverse transition"
                        disabled={loading}
                        onClick={auth}
                    >
                        Sign In
                    </Button>
                )}

                {/* {session?.user && ( */ }
                {session && (
                
                    <Button
                        className="bg-inverse-soft md:hover:bg-inverse text-inverse transition"
                        disabled={loading}
                        onClick={() => {
                            setLoading(true);
                            // signOut();
                            auth();
                        }}
                    >
                        Sign Out
                    </Button>
                )}

                <Link href="/cart">
                    <Button className="relative bg-inverse-soft md:hover:bg-inverse text-inverse transition">
                        {/* <ShoppingBagOutlined /> */}
                        Bag
                        <span className="sr-only">Notifications</span>
                        {totalItems >= 1 && (
                            <div
                                className={twMerge(
                                    'absolute inline-flex items-center justify-center w-6 h-6 text-sm text-inverse bg-primary -top-2 -right-2 rounded-full'
                                )}
                            >
                                {totalItems}
                            </div>
                        )}
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default TopBar;
