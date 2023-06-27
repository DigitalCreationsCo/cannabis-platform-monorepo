import { getDashboardSite, getShopSite, modalActions, modalTypes, selectUserState } from '@cd/core-lib';
import { Button, FlexBox, H2, Paragraph, styles } from '@cd/ui-lib';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import logo from '../../public/logo.png';

export type TopBarProps = {  
    signOut: () => void;
};

function AdminTopBar({ signOut }: TopBarProps) {
    
    const dispatch = useDispatch();
    const { user, isSignedIn } = useSelector(selectUserState);

    function openLoginModal() {
        dispatch(
            modalActions.openModal({
                modalType: modalTypes.loginModal
            })
        );
    }

    function getUserHome() {
        const 
        dashboardDomain = process.env.NEXT_PUBLIC_DASHBOARD_APP_URL;
        
        if (user.memberships?.[0]?.role.toLocaleUpperCase() === 'ADMIN' ||
            user.memberships?.[0]?.role.toLocaleUpperCase() === 'OWNER')
            return getDashboardSite('/dashboard');
        else
        if (window.location.href.startsWith(dashboardDomain || 'app'))
        return getDashboardSite('/');
        else 
        return getShopSite('/');
    }

    return (
        <div className={twMerge(styles.TOPBAR.topbar)}>
            <div className='pl-2 flex items-center'>
                <Link href={getDashboardSite("/")} passHref>
                    <Image alt="Gras" width={50} height={50} src={logo} />
                </Link>
                <Link href={getDashboardSite("/")}>
                    <H2 className="pt-0.5">Gras</H2>
                </Link>
            </div>
            
            <div className="flex-1"></div>
            
            { isSignedIn ? (
                <>
                    <Link href={getDashboardSite("/support")}>
                        <Paragraph className={twMerge('pt-1', 'px-3', 'text-md', 'whitespace-nowrap')}>
                            Need Support?
                        </Paragraph>
                    </Link>
                    <FlexBox>
                        <Button onClick={signOut}>Sign Out</Button>
                    </FlexBox>
                </>
            ) : (
                    <Button 
                    className='pt-1'
                    size='sm' 
                    bg='transparent' 
                    hover='transparent'
                    onClick={openLoginModal}>
                        Sign In</Button>
            )}
        </div>
    );
}

export default AdminTopBar;
