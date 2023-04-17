import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import FlexBox from './FlexBox';

function Center({ className, children }: { className?: string } & PropsWithChildren) {
    return (
        <FlexBox className={twMerge('grow', 'justify-center items-center text-center', className)}>{children}</FlexBox>
    );
}

export default Center;
