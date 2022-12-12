import cx from 'clsx';
import type { Session } from 'next-auth';
// import { useSelector } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import { H2, Paragraph } from './Typography';
import { useState } from 'react';
import Button from './Button';
import logo from './assets/logo.png';
import { twMerge } from 'tailwind-merge';
interface TopBarProps {
    session: Session | null;
}

function TopBar({ session }: TopBarProps) {
    const totalItems = 6;
    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const toggleDialog = () => setDialogOpen(!dialogOpen);

    // const state = useSelector((state) => state);
    // const { totalItems } = state.cart;

    const bar = cx('flex flex-row pr-4 lg:px-8 bg-default space-x-2 items-center shadow');
    return (
        <div className={cx(bar)}>
            <Link href="/" passHref>
                <Image alt="Gras" width={50} height={50} src={logo} />
            </Link>
            <Link href="/">
                <H2 className={'text-primary'}>Gras</H2>
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
                        'whitespace-nowrap'
                    )}
                >
                    Cannabis Marketplace
                </Paragraph>
            </Link>

            <div className="flex-1"></div>

            {session?.user && (
                <Link href="/support">
                    <Paragraph className={cx('pt-1', 'text-md', 'whitespace-nowrap')}>Need Support?</Paragraph>
                </Link>
            )}

            <div className="flex flex-row space-x-4">
                {!session && (
                    <Button
                        className="bg-inverse-soft md:hover:bg-inverse text-inverse transition"
                        disabled={loading}
                        onClick={toggleDialog}
                    >
                        Sign In
                    </Button>
                )}

                {session?.user && (
                    <Button
                        className="bg-inverse-soft md:hover:bg-inverse text-inverse transition"
                        disabled={loading}
                        onClick={() => {
                            setLoading(true);
                            // signOut();
                        }}
                    >
                        Sign Out
                    </Button>
                )}

                <Link href="/cart">
                    <Button className="bg-inverse-soft md:hover:bg-inverse text-inverse transition">
                        {/* <ShoppingBagOutlined /> */}
                        Bag
                        <span className="sr-only">Notifications</span>
                        {totalItems >= 1 && (
                            <div
                                className={twMerge(
                                    'absolute inline-flex items-center justify-center w-6 h-6 text-sm font-bold text-primary bg-primary border-white rounded-full -top-2 -right-2'
                                )}
                            >
                                {totalItems}
                            </div>
                        )}
                    </Button>
                </Link>
            </div>

            {/* <Dialog open={dialogOpen} scroll="body" onClose={toggleDialog}>
                <Login dialogClose={() => setDialogOpen(false)} />
            </Dialog> */}
        </div>
    );
}

export default TopBar;
