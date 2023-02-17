import { Button, Center, H1, Paragraph } from '@cd/shared-ui';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import backdrop from '../../public/marijuana-backdrop.png';
import { LoginModal } from './modal';
export default function LandingPage() {
    const [showModal, setModal] = useState(false);

    const session = useSessionContext();
    return (
        <>
            <LoginModal open={showModal} onClose={() => setModal(false)} />
            <div
                className="w-full flex"
                style={{
                    width: '100%',
                    height: '70vh',
                    clipPath: 'inset(0 0 0 0)'
                }}
            >
                <Image src={backdrop} alt="" fill style={{ objectFit: 'cover', objectPosition: '80% 20%' }} />
                <div
                    style={{
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        position: 'fixed',
                        height: '100%',
                        width: '100%',
                        left: '0',
                        top: '0'
                    }}
                ></div>

                <Center className="z-10 space-y-2 justify-center">
                    <H1 className="text-inverse font-display">Welcome to Gras Cannabis</H1>
                    <Paragraph className="text-lg text-inverse">Sign in to use this app</Paragraph>
                    <Button
                        className="w-[200px] h-[80px] bg-primary hover:bg-[#0b7529] opacity-90 text-xl transition ease-in-out duration-300"
                        disabled={session.loading}
                        onClick={() => setModal(true)}
                    >
                        Sign In
                    </Button>

                    <Paragraph className="whitespace-pre-line text-lg text-inverse">
                        {`If you are a new dispensary, 
                        create a Dispensary Account here`}
                    </Paragraph>
                    <Link href="/signup/create-dispensary-account">
                        <Button className="w-[200px] h-[80px] bg-primary hover:bg-[#0b7529] opacity-90 transition ease-in-out duration-300">
                            <Paragraph className="whitespace-pre-line">{`Create a
                             Dispensary Account`}</Paragraph>
                        </Button>
                    </Link>
                </Center>
            </div>
        </>
    );
}
