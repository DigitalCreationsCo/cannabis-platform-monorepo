import { modalActions, modalTypes, selectUserState } from '@cd/core-lib';
import { Button, FlexBox, H1, H2, H4, H6, LayoutContextProps, Page, Paragraph } from '@cd/ui-lib';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import { PropsWithChildren } from 'react';
import { useCookies } from 'react-cookie';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { twMerge } from 'tailwind-merge';
import backdrop from '/public/marijuana-backdrop.png';

function LandingPage() {

    const 
    { isSignedIn } = useAppSelector(selectUserState);

    const dispatch = useAppDispatch();
    const [cookies] = useCookies(['yesOver21'])
    
    function openCheckAgeModalOrEnterSite() {
        cookies['yesOver21'] ? Router.push('/browse') : 
            dispatch(
                modalActions.openModal({
                    modalType: modalTypes.checkAgeModal,
                    modalText: ''
            })
        );
    }
    
    const styles={
        hero: [
            "w-full pt-4 pb-6 md:pt-4 px-4 md:px-14 lg:px-32",
            "md:flex-row items-start", 
            "space-y-8 md:space-y-0 md:space-x-8",
            "bg-secondary-light"
        ],
        aboutContainer: "w-full md:w-1/3 m-auto min-h-[200px]",
        about: [
            "bg-inverse",
        ]
    }

    
    return (
        <Page className="p-0 lg:p-0">
            <ImageBackDrop src={backdrop}>
                <FlexBox className='justify-between min-h-[555px] space-y-4'>
                    <FlexBox className={twMerge(styles.hero)} >
                        <FlexBox>
                        <H1 color="light" className='pb-0 whitespace-normal font-semi-bold'>Cannabis,&nbsp;Delivered{'\xa0'}🌴</H1>
                        <H6 className="pt-0 whitespace-nowrap text-light text-center w-full">Gras is a one stop cannabis marketplace</H6>
                        </FlexBox>
                        <Button
                            size="lg"
                            bg="secondary"
                            transparent
                            className="hover:bg-primary-light"
                            onClick={openCheckAgeModalOrEnterSite}
                        >
                            Enter
                        </Button>
                    </FlexBox>
                    {/* <FlexBox className={twMerge(styles.aboutContainer, 'bg-primary p-4 rounded relative')}> */}
                        <FlexBox className={twMerge(styles.about, 'opacity-95 cursor-default space-y-2 m-auto w-[440px] h-full p-8 rounded items-center shadow')}>
                            <H2 className='text-secondary'>About Gras</H2>
                            <Paragraph>Gras is a home-grown service provider for cannabis lovers.
                                We serve the people of our communities, that enjoy cannabis,
                                by offering a bridge of communication, clarity and support.
                            </Paragraph>

                            {!isSignedIn && <FlexBox className='m-auto items-center space-y-2'>
                                <H4 className='text-xl'>
                                {`Are you a dispensary? Get started here.`}</H4>
                                <Link href="/signup/create-dispensary-account">
                                    <Button size="lg" 
                                    bg="primary" 
                                    transparent
                                    className="p-4 hover:bg-primary-light"
                                    >
                                    <Paragraph color="light">
                                        {`Create a dispensary account`}</Paragraph>
                                    </Button>
                                </Link>
                            </FlexBox>}
                        </FlexBox>
                    {/* </FlexBox> */}

                    

                </FlexBox>
            </ImageBackDrop>
        </Page>
    );
}

const ImageBackDrop = ({ src, children }: { src: string | StaticImageData } & PropsWithChildren) => {
    return (
        <div
            className="relative min-h-screen overflow-scroll-hidden"
            style={{
                clipPath: 'inset(0 0 0 0)'
            }}
        >
            <Image 
            priority
            src={src} 
            alt="" 
            fill 
            style={{ zIndex: -1, objectFit: 'cover', objectPosition: '44% 20%' }} 
            />
            <div
                style={{
                    zIndex: -1,
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    position: 'fixed',
                    height: '100%',
                    width: '100%',
                    left: '0',
                    top: '0'
                }}
            ></div>
            {children}
        </div>
    );
};


LandingPage.getLayoutContext = (): LayoutContextProps => ({
    showHeader: false,
    showTopBar: true
});
export default LandingPage;
