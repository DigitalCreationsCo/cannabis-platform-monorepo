import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import { Tiny } from './Typography';

type PageProps = {
    gradient?: 'pink' | 'green';
    className?: string | string[];
};

function Page ({ gradient, children, className = '' }: PropsWithChildren<PageProps>) {
    
    const 
    appVersion = '0.1.0'
    
    type Styles = (string | string[])[];
    const 
    styles:Styles = Object.values({
        page: ['bg-inverse-soft', 'flex flex-col grow', 'min-w-screen', 'md:pt-8 pb-24', 'lg:px-16'],
        gradient: [gradient && 'anim8-' + gradient + '-gradient' || ''],
        cursor: ['cursor-default'],
        // hideOverflow: ['overflow-hidden'],

        className
    });

    return (
    <div className={twMerge(styles)}>
        {children}
        <Tiny className="fixed bottom-0 right-0 pr-1 cursor-default text-accent-soft">{ appVersion }</Tiny>
    </div>
    );
}

export default Page;
