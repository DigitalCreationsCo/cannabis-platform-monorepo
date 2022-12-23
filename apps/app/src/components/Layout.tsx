import { PropsWithChildren, ReactEventHandler, useState } from 'react';
import { Footer, Header, SideNavContainer } from '@cd/shared-ui';
import SearchBar from "./AppSearch"
import TopBar from './TopBar';
import AdminDashboardNavigation from './AdminDashBoardNavigation';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import logo from '../../public/logo.png'
import Image from 'next/image';
import { H2, Paragraph, Button, FlexBox, LoadingDots } from '@cd/shared-ui';
import Session from 'supertokens-auth-react/recipe/session';


interface LayoutProps extends PropsWithChildren {
    onSearchChange?: ReactEventHandler;
    placeholder?: string;
}

function Layout({ onSearchChange, placeholder, children }: LayoutProps) {
    const session = useSessionContext()

    if (session.loading === true) {
    return <LoadingDots />;
    }

    const topbar = ['flex flex-row h-[66px] pr-4 lg:px-8 bg-inverse space-x-2 items-center shadow']
    return (
        <>
            {/* <TopBar
                totalItems={ 4 } 
            /> */}

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
                                Session.signOut
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
            
            { session.doesSessionExist && 
                (<SideNavContainer SideNavComponent={ AdminDashboardNavigation } fixedComponentId={ 'admin-dashboard' }>
                    <Header><SearchBar placeholder={ placeholder } onChange={ onSearchChange } /></Header>
                    { children }
                </SideNavContainer>) ||
                <>
                <Header><SearchBar placeholder={ placeholder } onChange={ onSearchChange } /></Header>
                    { children }</>
            }
            <Footer />
        </>
    );
}

export default Layout;
