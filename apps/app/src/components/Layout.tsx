import { PropsWithChildren, ReactEventHandler, useState } from 'react';
import SearchBar from "./AppSearch"
import AdminDashboardNavigation from './AdminDashBoardNavigation';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import logo from '../../public/logo.png'
import Image from 'next/image';
import { Footer, Header, SideNavContainer, H2, Paragraph, Button, FlexBox, LoadingDots } from '@cd/shared-ui';
import Session from 'supertokens-auth-react/recipe/session';
import SuperTokens from 'supertokens-auth-react';
import { Page } from '@cd/shared-ui';
import { Center } from '@cd/shared-ui';

interface LayoutProps extends PropsWithChildren {
    onSearchChange?: ReactEventHandler;
    placeholder?: string;
}

export default function Layout({ onSearchChange, placeholder, children }: LayoutProps) {
    const session = useSessionContext()

    if (session.loading === true) {
    return <Page><Center><LoadingDots /></Center></Page>
    }

    const topbar = ['flex flex-row h-[66px] pr-4 lg:px-8 bg-inverse space-x-2 items-center shadow']
    return (
        <>
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
                        'pl-2',
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
                            onClick={ () => Session.signOut() }
                        >
                            Sign Out
                        </Button>
                    </FlexBox>
                </>
            ) }

            {!session.doesSessionExist && (
                <Button
                    disabled={session.loading}
                    onClick={() => SuperTokens.redirectToAuth({ show: 'signin' })}
                >
                    Sign In
                </Button>
            ) }
            </div>
            
            { session.doesSessionExist &&
                (
                    <SideNavContainer SideNavComponent={ AdminDashboardNavigation } fixedComponentId={ 'admin-dashboard' }>
                    <Header><SearchBar placeholder={ placeholder } onChange={ onSearchChange } /></Header>
                    { children }
                    </SideNavContainer>
                ) ||
                (
                    <>
                    { children }
                    </>
                )
            }
            <Footer />
        </>
    );
}