import { Button, FlexBox, Footer, H2, Header, Paragraph } from '@cd/shared-ui';
import { LoginModal, SideNavContainer } from 'components';
import Image from 'next/image';
import Link from 'next/link';
import { ChangeEventHandler, Dispatch, PropsWithChildren, ReactEventHandler, SetStateAction, useState } from 'react';
import { signOut, useSessionContext } from 'supertokens-auth-react/recipe/session';
import { twMerge } from 'tailwind-merge';

import logo from '../../public/logo.png';
import AdminDashboardNavigation from './AdminDashBoardNavigation';
import SearchBar from './AppSearch';
interface LayoutProps extends PropsWithChildren {
    onSearchChange?: ChangeEventHandler<HTMLInputElement> & ReactEventHandler<Element>;
    placeholder?: string;
}

export default function Layout({ onSearchChange, placeholder, children }: LayoutProps) {
    const [showModal, setModal] = useState(false);

    const session = useSessionContext();
    const { doesSessionExist } = session;
    if (session.loading === true) return <></>;

    const styles = { main: 'bg-inverse-soft min-h-[800px]' };
    return (
        <div className="h-screen flex flex-col">
            <LoginModal open={showModal} onClose={() => setModal(false)} />
            {doesSessionExist ? (
                <div className={styles.main}>
                    <TopBar doesSessionExist={doesSessionExist} />
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
                    <TopBar doesSessionExist={doesSessionExist} setLoginModal={setModal} />
                    {children}
                </>
            )}
            <Footer />
        </div>
    );
}

function TopBar({
    doesSessionExist,
    setLoginModal
}: {
    doesSessionExist?: boolean;
    setLoginModal?: Dispatch<SetStateAction<boolean>>;
}) {
    const signedOut = async () => {
        signOut();
        window.location.href = '/';
    };
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
            {!doesSessionExist && (
                <FlexBox>
                    <Button onClick={() => setLoginModal(true)}>Sign In</Button>
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
                        <Button onClick={signedOut}>Sign Out</Button>
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
