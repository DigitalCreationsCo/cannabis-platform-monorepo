import { LayoutContextProps, modalActions, modalTypes } from '@cd/core-lib';
import { Button, FlexBox, H1, H2, H4, H5, Page, Paragraph } from '@cd/ui-lib';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { twMerge } from 'tailwind-merge';
import backdrop from '/public/marijuana-backdrop.png';

function LandingPage() {

    const dispatch = useAppDispatch();
    
    function openCheckAgeModal() {
        dispatch(
            modalActions.openModal({
                modalType: modalTypes.checkAgeModal,
                modalText: ''
            })
        );
    }

    const styles={
        hero: [
            "w-full py-8 px-4 md:px-14 lg:px-32",
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
                <FlexBox className='justify-between min-h-[555px]'>
                    <FlexBox className={twMerge(styles.hero)} >
                        <FlexBox>
                        <H1 color="light" className='pb-0 whitespace-normal'>Get Cannabis Delivered{'\xa0'}🌴</H1>
                        <H5 className="pt-0 whitespace-nowrap text-light">with Gras, a one stop cannabis marketplace</H5>
                        </FlexBox>
                        <Button
                            size="lg"
                            bg="secondary"
                            transparent
                            className="hover:bg-primary-light"
                            onClick={openCheckAgeModal}
                        >
                            Enter
                        </Button>
                    </FlexBox>
                    {/* <FlexBox className={twMerge(styles.aboutContainer, 'bg-primary p-4 rounded relative')}> */}
                        <FlexBox className={twMerge(styles.about, 'opacity-95 cursor-default space-y-2 m-auto md:m-10 w-[440px] h-full p-8 rounded items-center shadow')}>
                            <H2 className='text-secondary'>About Gras</H2>
                            <Paragraph>Gras is a home-grown service provider for cannabis lovers.
                                We serve the people of our communities, that enjoy cannabis,
                                by offering a bridge of communication, clarity and support.
                            </Paragraph>
                        </FlexBox>
                    {/* </FlexBox> */}

                    <FlexBox className='m-auto items-center space-y-2'>
                        <H4 color="light" className='text-xl'>
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
                    </FlexBox>

                </FlexBox>
            </ImageBackDrop>
        </Page>
    );
}

const ImageBackDrop = ({ src, children }: { src: string | StaticImageData } & PropsWithChildren) => {
    return (
        <div
            className="relative min-h-screen w-screen overflow-hidden"
            style={{
                clipPath: 'inset(0 0 0 0)'
            }}
        >
            <Image 
            priority
            src={src} 
            alt="" 
            fill 
            style={{ zIndex: -1, objectFit: 'cover', objectPosition: '80% 20%' }} 
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
