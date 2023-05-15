import { Button, Center, H1, H5, LayoutContextProps, Page, Paragraph } from '@cd/ui-lib';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import backdrop from '/public/marijuana-backdrop.png';

function WelcomePage() {
    return (
        <Page className="p-0 lg:p-0 border-b">
            <ImageBackDrop src={backdrop}>
                <Center>
                    <H1 color="light">Welcome to Gras</H1>
                    <H5 color="light">Sign in to use this app</H5>
                    <Button
                        size="lg"
                        bg="primary"
                        transparent
                        // FIX THIS
                        disabled={false}
                        className="hover:bg-[#0b7529]"
                    >
                        Sign In
                    </Button>

                    <H5 color="light">
                        {`If you are a new dispensary, 
                        create a Dispensary Account here`}
                    </H5>
                    <Link href="/signup/create-dispensary-account">
                        <Button size="lg" bg="primary" transparent className="hover:bg-[#0b7529]">
                            <Paragraph color="light">{`Create a
                             Dispensary Account`}</Paragraph>
                        </Button>
                    </Link>
                </Center>
            </ImageBackDrop>
        </Page>
    );
}

const ImageBackDrop = ({ src, children }: { src: string | StaticImageData } & PropsWithChildren) => {
    return (
        <div
            className="flex grow"
            style={{
                clipPath: 'inset(0 0 0 0)'
            }}
        >
            <Image src={src} alt="" fill style={{ zIndex: -1, objectFit: 'cover', objectPosition: '80% 20%' }} />
            <div
                style={{
                    zIndex: -1,
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    position: 'absolute',
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

export default WelcomePage;

WelcomePage.getLayoutContext = (): LayoutContextProps => ({
    showHeader: false,
    showTopBar: true,
    showSideNav: false,
});