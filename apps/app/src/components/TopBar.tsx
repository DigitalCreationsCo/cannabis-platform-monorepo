import { Button, FlexBox, H2, Paragraph } from '@cd/shared-ui';
import Image from 'next/image';
import Link from 'next/link';
import SuperTokens from 'supertokens-auth-react';
import SessionReact, { useSessionContext } from 'supertokens-auth-react/recipe/session';
import { twMerge } from 'tailwind-merge';
import logo from '../../public/logo.png';
// interface TopBarProps {
//     totalItems: number;
// }

function TopBar() {
    const session = useSessionContext();
    async function logoutClicked() {
        await SessionReact.signOut();
        SuperTokens.redirectToAuth();
    }
    // async function fetchUserData() {
    //     const res = await fetch('/api/user');
    //     if (res.status === 200) {
    //         const json = await res.json();
    //         alert(JSON.stringify(json));
    //     }
    // }
    const topbar = ['flex flex-row h-[66px] pr-4 lg:px-16 bg-inverse space-x-2 items-center shadow'];
    if (session.loading)
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
                <Button disabled={session.loading} onClick={() => SuperTokens.redirectToAuth({ show: 'signin' })}>
                    Sign In
                </Button>
            </div>
        );

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
            {SessionReact.doesSessionExist() && (
                <>
                    <Link href="/support">
                        <Paragraph className={twMerge('pt-1', 'px-3', 'text-md', 'whitespace-nowrap')}>
                            Need Support?
                        </Paragraph>
                    </Link>
                    <FlexBox>
                        <Button disabled={session.loading} onClick={() => SessionReact.signOut()}>
                            Sign Out
                        </Button>
                    </FlexBox>
                </>
            )}
            {!SessionReact.doesSessionExist() && (
                <Button disabled={session.loading} onClick={() => SuperTokens.redirectToAuth({ show: 'signin' })}>
                    Sign In
                </Button>
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
