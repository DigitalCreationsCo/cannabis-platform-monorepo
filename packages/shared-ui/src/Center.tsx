import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import FlexBox from './FlexBox';

function Center({ className, children }: { className?: string } & PropsWithChildren) {
    return <FlexBox className={twMerge('grow flex-col', className)}>{children}</FlexBox>;
}

export default Center;
