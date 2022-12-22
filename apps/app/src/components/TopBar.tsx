import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/logo.png'
import { H2, Paragraph, Button } from '@cd/shared-ui';
import { twMerge } from 'tailwind-merge';
import SessionReact, { useSessionContext } from 'supertokens-auth-react/recipe/session';
import SuperTokensReact from "supertokens-auth-react";
import { FlexBox } from '@cd/shared-ui';

interface TopBarProps {
    totalItems: number;
}

function TopBar({ totalItems = 0 }: TopBarProps) {
    const session = useSessionContext()
    async function logoutClicked() {
        await SessionReact.signOut();
        SuperTokensReact.redirectToAuth();
    }

    async function fetchUserData() {
        const res = await fetch("/api/user");
        if (res.status === 200) {
            const json = await res.json();
            alert(JSON.stringify(json));
        }
    }

    const topbar = ['flex flex-row h-[66px] pr-4 lg:px-8 bg-inverse space-x-2 items-center shadow']

    if (!session.loading) {
        return (
            <div className={ twMerge(topbar) }>
                <Link href="/" passHref>
                    <Image alt="Gras" width={ 50 } height={ 50 } src={ logo } />
                </Link>
                <Link href="/">
                    <H2>Gras</H2>
                </Link>
                <Link href="/">
                    <Paragraph
                        className={ twMerge(
                            'pt-1',
                            'text-lg',
                            'hidden',
                            'md:block',
                            'place-self-center',
                            'text-primary',
                        ) }
                    >
                        Cannabis Marketplace
                    </Paragraph>
                </Link>

                <div className="flex-1"></div>

                { session.doesSessionExist && (
                    <>
                        <Link href="/support">
                            <Paragraph className={ twMerge('pt-1', 'text-md', 'whitespace-nowrap') }>Need Support?</Paragraph>
                        </Link>
                        <FlexBox>
                            <Button
                                disabled={ session.loading }
                                onClick={
                                    // test how much of this is redundant
                                    () => {}
                                    // SessionReact.signOut
                                    // location.reload();
                                }
                            >
                                Sign Out
                            </Button>
                        </FlexBox>
                    </>
                ) }

                {!session.doesSessionExist && (
                    // <FlexBox>
                        <Link href="/auth">
                            <Button
                                disabled={session.loading}
                                onClick={() => {}
                                    // test how much of this is redundant
                                    // async () => await SuperTokensReact.redirectToAuth({ show: 'signin'})
                                    // SessionReact.attemptRefreshingSession()
                                    // location.reload();
                                }
                            >
                                Sign In
                            </Button>
                        </Link>
                    // </FlexBox>
                ) }

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
}

export default TopBar;
