import {
    Button, Center, FlexBox, Footer, H2, Header, LoadingDots, Page, Paragraph
} from '@cd/shared-ui';
import Image from 'next/image';
import Link from 'next/link';
import { PropsWithChildren, ReactEventHandler } from 'react';
import SuperTokens from 'supertokens-auth-react';
import Session, { useSessionContext } from 'supertokens-auth-react/recipe/session';
import { twMerge } from 'tailwind-merge';
import logo from '../../public/logo.png';
import AdminDashboardNavigation from './AdminDashBoardNavigation';
import SearchBar from "./AppSearch";
import SideNavContainer from './SideNavContainer';

interface LayoutProps extends PropsWithChildren {
    onSearchChange?: ReactEventHandler;
    placeholder?: string;
}

export default function Layout({ onSearchChange, placeholder, children }: LayoutProps) {
    const session = useSessionContext()
    // if (session.loading === true) return <Page><Center><LoadingDots /></Center></Page>
    const main = "bg-inverse-soft"
    const topbar = [ 'flex flex-row h-[66px] pr-4 lg:px-8 lg:pr-16 bg-inverse space-x-2 items-center shadow' ]
    return (
        <div className={main}>
            <div className={ twMerge(topbar) }>   
            <Link href="/" passHref>
                <Image alt="Gras" width={ 50 } height={ 50 } src={ logo } />
            </Link>
            <Link href="/">
                <H2 className="pt-1">Gras</H2>
            </Link>
            <Link href="/">
                <Paragraph
                    className={ twMerge(
                        'pt-2',
                        'pl-2',
                        'text-lg',
                        'hidden',
                        'md:block',
                        'place-self-center',
                        'text-primary font-semibold',
                    ) }
                >
                    Cannabis Marketplace
                </Paragraph>
            </Link>

            <div className="flex-1"></div>

            { session.doesSessionExist && (
                <>
                    <Link href="/support">
                        <Paragraph className={ twMerge('pt-1', 'px-3', 'text-md', 'whitespace-nowrap') }>Need Support?</Paragraph>
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
                { session.loading === true ? (
                    <SideNavContainer SideNavComponent={ AdminDashboardNavigation } fixedComponentId={ 'dashboard-links' }>
                        <Header><SearchBar placeholder={ placeholder } onChange={ onSearchChange } /></Header>
                        <Page><Center><LoadingDots /></Center></Page>
                    </SideNavContainer>)
                    : session.doesSessionExist ?
                        (
                        <SideNavContainer
                            SideNavComponent={ AdminDashboardNavigation }
                            fixedComponentId={ 'dashboard-links-container' }
                            drawerComponentId={ 'dashboard-links-drawer' }
                        >
                                <Header
                                    SearchComponent={ <SearchBar placeholder={ placeholder } onChange={ onSearchChange } /> }
                                    drawerComponentId={ 'dashboard-links-drawer' }
                                >
                                </Header>
                                { children }
                            </SideNavContainer>
                        )
                        : <>{ children }</>
                }
                <Footer />
        </div>
    );
}