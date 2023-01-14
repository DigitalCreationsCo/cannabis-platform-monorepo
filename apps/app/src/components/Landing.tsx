import { Button, Center, H1, Paragraph } from '@cd/shared-ui';
import Image from 'next/image';
import SuperTokens from 'supertokens-auth-react';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import backdrop from '../../public/marijuana-backdrop.png';
export default function LandingPage() {
    const session = useSessionContext();
    return (
        <div
            className="flex w-full relative"
            style={{
                width: '100%',
                height: '70vh',
                clipPath: 'inset(0 0 0 0)',
            }}
        >
            <Image src={backdrop} alt="" fill={true} style={{ objectFit: 'cover', objectPosition: '40% 60%' }} />
            <div
                style={{
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    position: 'fixed',
                    height: '100%',
                    width: '100%',
                    left: '0',
                    top: '0',
                }}
            ></div>

            <Center className="z-10 space-y-1">
                <H1 className="text-inverse font-display">Welcome to Gras Cannabis</H1>
                <Paragraph className="text-lg text-inverse">Sign in to use this app</Paragraph>
                <Button
                    className="w-[200px] h-[80px] bg-primary hover:bg-[#0b7529] opacity-90 text-xl transition ease-in-out duration-300"
                    disabled={session.loading}
                    onClick={() => SuperTokens.redirectToAuth({ show: 'signin' })}
                >
                    Sign In
                </Button>
            </Center>
        </div>
    );
}
