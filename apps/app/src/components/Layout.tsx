import { Button, FlexBox, Footer, H2, Header, Paragraph } from '@cd/shared-ui';
import { SideNavContainer } from 'components';
import Image from 'next/image';
import Link from 'next/link';
import { ChangeEventHandler, PropsWithChildren, ReactEventHandler, useEffect } from 'react';
import SuperTokens from 'supertokens-auth-react';
import SessionReact, { useSessionContext } from 'supertokens-auth-react/recipe/session';
import { twMerge } from 'tailwind-merge';
import logo from '../../public/logo.png';
import AdminDashboardNavigation from './AdminDashBoardNavigation';
import SearchBar from './AppSearch';
interface LayoutProps extends PropsWithChildren {
    onSearchChange?: ChangeEventHandler<HTMLInputElement> & ReactEventHandler<Element>;
    placeholder?: string;
}

export default function Layout({ onSearchChange, placeholder, children }: LayoutProps) {
    const session = useSessionContext();
    const main = 'bg-inverse-soft min-h-[800px]';
    if (session.loading === true) return <></>;
    return (
        <>
            {session.doesSessionExist ? (
                <div className={main}>
                    <TopBar doesSessionExist={session.doesSessionExist} />
                    <Header
                        SearchComponent={<SearchBar placeholder={placeholder} onChange={onSearchChange} />}
                        drawerComponentId={'dashboard-links-drawer'}
                    ></Header>
                    <SideNavContainer
                        SideNavComponent={AdminDashboardNavigation}
                        fixedComponentId={'dashboard-links-container'}
                        drawerComponentId={'dashboard-links-drawer'}
                    >
                        {children}
                    </SideNavContainer>
                </div>
            ) : (
                <>
                    <TopBar doesSessionExist={session.doesSessionExist} />
                    {children}
                </>
            )}
            <Footer />
        </>
    );
}

function TopBar({ doesSessionExist }: { doesSessionExist?: boolean }) {
    useEffect(() => {
        console.log('does Session exist?', doesSessionExist);
    }, [doesSessionExist]);
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
            {!doesSessionExist && (
                <FlexBox>
                    <Button onClick={() => SuperTokens.redirectToAuth({ show: 'signin' })}>Sign In</Button>
                </FlexBox>
            )}
            {doesSessionExist && (
                <>
                    <Link href="/support">
                        <Paragraph className={twMerge('pt-1', 'px-3', 'text-md', 'whitespace-nowrap')}>
                            Need Support?
                        </Paragraph>
                    </Link>
                    <FlexBox>
                        <Button onClick={() => SessionReact.signOut()}>Sign Out</Button>
                    </FlexBox>
                </>
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
