import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import Card from './Card';

function Row({ className, children }: { className?: string } & PropsWithChildren) {
    return <Card className={twMerge('flex flex-row justify-between items-center', className)}>{children}</Card>;
}

export default Row;
