import { FlexBox, H1, H2, H5, LayoutContextProps, Page, Paragraph } from '@cd/ui-lib';
import Image, { StaticImageData } from 'next/image';
import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import backdrop from '/public/marijuana-backdrop.png';

const
getStartedEmail = 'growwithus@grascannabis.org';

const
EmailLink = ({email}: {email: string}) => (<a href="mailto:{email}"><b>{email}</b></a>)

function LandingPage() {

    const styles={
        hero: [
            "w-full pt-4 pb-8 md:pt-8 px-4 md:px-14 lg:px-32",
            "md:flex-row items-start", 
            "space-y-8 md:space-y-0 md:space-x-8",
            "bg-secondary-light"
        ],
        aboutContainer: "w-full md:w-1/3 m-auto min-h-[200px]",
        about: [
            "bg-inverse pb",
        ]
    }

    
    return (
        <Page className="p-0 lg:p-0">
            <ImageBackDrop src={backdrop}>
                <FlexBox className='justify-between min-h-[555px] space-y-8'>
                    <FlexBox className={twMerge(styles.hero)} >
                        <FlexBox>
                        <H1 color="light" className='pb-0 whitespace-normal'>Get&nbsp;Cannabis&nbsp;Delivered{'\xa0'}🌴</H1>
                        <H5 className="pt-0 whitespace-nowrap text-light">with Gras, a one stop cannabis marketplace</H5>
                        </FlexBox>
                        
                    </FlexBox>
                    {/* <FlexBox className={twMerge(styles.aboutContainer, 'bg-primary p-4 rounded relative')}> */}
                            <H1 color='light' className='text-center m-auto whitespace-normal'>
                            Gras is bringing delivery to you</H1>
                        
                        <FlexBox className={twMerge(styles.about, 'opacity-95 cursor-default w-[440px] space-y-8 m-auto h-full p-8 pb-12 rounded items-center shadow')}>
                            <FlexBox className='m-auto items-center'><H2 className='text-secondary'>About Gras</H2>
                            <Paragraph>Gras is a home-grown service provider for cannabis lovers.
                                We serve the people of our communities, that enjoy cannabis,
                                by offering a bridge of communication, clarity and support.
                            </Paragraph>
                            </FlexBox>

                            <FlexBox><FlexBox className='m-auto items-center'>
                                <H2 className='text-secondary'>
                                {`Are you a dispensary?`}</H2>
                                <Paragraph>
                                    <b>Your business will reach more customers with Gras. We guarantee high quality delivery fulfillment or your money back.</b>
                                    {'\n'}
                                    {'\n'}
                                    Email us at <EmailLink email={getStartedEmail} /> to join our early access program.
                                    
                                </Paragraph>
                                {/* <Link href="/signup/create-dispensary-account">
                                    <Button size="lg" 
                                    bg="primary" 
                                    transparent
                                    className="p-4 hover:bg-primary-light"
                                    >
                                    <Paragraph color="light">
                                        {`Create a dispensary account`}</Paragraph>
                                    </Button>
                                </Link> */}
                            </FlexBox>
                            </FlexBox>
                            
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
            className="relative min-h-screen min-w-fit overflow-hidden"
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
