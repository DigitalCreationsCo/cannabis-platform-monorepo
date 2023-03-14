import { ExtendedPageComponent } from '@cd/shared-lib';
import { Button, Center, H1, H5, Page, Paragraph } from '@cd/shared-ui';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import backdrop from '../public/marijuana-backdrop.png';

function WelcomePage({ session }: ExtendedPageComponent) {
    return (
        <Page className="p-0 sm:p-0 lg:p-0">
            <ImageBackDrop src={backdrop}>
                <Center>
                    <H1 color="light">Welcome to Gras Cannabis</H1>
                    <H5 color="light">Sign in to use this app</H5>
                    <Button
                        size="lg"
                        bg="primary"
                        transparent
                        disabled={session.loading}
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
            className="w-full flex"
            style={{
                width: '100%',
                height: '100%',
                clipPath: 'inset(0 0 0 0)'
            }}
        >
            <Image src={src} alt="" fill style={{ zIndex: -1, objectFit: 'cover', objectPosition: '80% 20%' }} />
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

export default WelcomePage;
